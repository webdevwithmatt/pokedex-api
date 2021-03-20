const { envVars } = module.parent.exports;
const { authServer, models } = envVars;
const { bcrypt, jwt, Sequelize } = envVars.requires;
const { Op } = Sequelize;
const { promisify } = require('util');

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