const { envVars } = module.parent.exports;
const { authServer, models } = envVars;
const { bcrypt, jwt, Sequelize } = envVars.requires;
const { Op } = Sequelize;
const { promisify } = require('util');

const expiresInMinutes = 30;

const generateAccessToken = (payload) => promisify(jwt.sign)(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: `${expiresInMinutes}m` });

const generateRefreshToken = (payload) => promisify(jwt.sign)(payload, process.env.REFRESH_TOKEN_SECRET);

const getExpiresAt = (minutes) => {
    let expiresAt = new Date();
    return new Date(expiresAt.getTime() + (minutes * 60 * 1000));
};

authServer.post('/login', async (req, res) => {
    if (!req.body.username && !req.body.email) {
        return res.status(401).send({
            message: 'There was a problem logging in. Please check to make sure your email and password are correct and try again.',
        });
    }

    const trainer = await models.Trainer.findOne({
        where: {
            [Op.and]: {
                ...(req.body.email ? { email: req.body.email } : {}),
                ...(req.body.username ? { username: req.body.username } : {}),
            }
        },
        raw: true,
    });

    if (!trainer) {
        return res.status(401).send({
            message: 'There was a problem logging in. Please check to make sure your email and password are correct and try again.',
        });
    }

    try {
        if (!(await bcrypt.compare(req.body.password, trainer.password))) {
            return res.status(401).send({
                message: 'There was a problem logging in. Please check to make sure your email and password are correct and try again.',
            });
        }

        accessToken = await generateAccessToken(trainer);
        refreshToken = await generateRefreshToken(trainer);

        const salt = await bcrypt.genSalt();
        const hashedRefreshToken = await bcrypt.hash(refreshToken, salt);

        await models.Token.create({
            trainerId: trainer.id,
            refreshToken: hashedRefreshToken,
        });
    } catch (error) {
        return res.status(500).send({
            message: 'There was a problem logging in.',
            error,
        });
    }

    if (!accessToken || !refreshToken) {
        return res.status(500).send({
            message: 'There was a problem logging in.',
        });
    }

    return res.send({
        expiresInSeconds: expiresInMinutes * 60,
        expiresAt: getExpiresAt(expiresInMinutes),
        accessToken,
        refreshToken,
    });
});

authServer.post('/register', async (req, res) => {
    const {
        name,
        username,
        email,
        password,
        picture,
        hometownId,
        gender,
        birthday,
    } = req.body;


    if (!password || password.length() < parseInt(process.env.MIN_PASSWORD_LENGTH, 10)) {
        return res.status(400).send({
            message: 'There was a problem registering. Make sure your password follows the guidelines.',
        });
    }

    if (!name) {
        return res.status(400).send({
            message: 'There was a problem registering. Name is required.',
        });
    }

    if (!username) {
        return res.status(400).send({
            message: 'There was a problem registering. Username is required.',
        });
    }

    if (!email) {
        return res.status(400).send({
            message: 'There was a problem registering. Email is required.',
        });
    }

    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        await models.Trainer.create({
            name,
            username,
            email,
            password: hashedPassword,
            picture: picture || null,
            hometownId: hometownId || null,
            gender: gender || null,
            birthday: birthday ? new Date(birthday) : null,
        });

        return res.status(201).send({
            message: 'Thank you for registering!',
        });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).send({
                message: 'There was a problem registering. User already exists.',
                error,
            });
        }

        console.error(error);

        return res.status(500).send({
            message: 'There was a problem registering.',
            error,
        });
    }
});