require('dotenv').config();

const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');
const Sequelize = require('sequelize');

const authServer = express();
const port = 4000;

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: `${__dirname}/../pokedex.db`,
});

module.exports.envVars = {
    authServer,
    requires: {
        bcrypt,
        jwt,
        path,
    	Sequelize,
    	sequelize,
    },
};

const models = require(`${__dirname}/models/models`);
module.exports.envVars.models = models;

authServer.use(bodyParser.json());
authServer.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    return next();
});

require(`${__dirname}/routes/auth`);

process.on('exit', () => {
    sequelize.close();
});

authServer.listen(port, () => console.log(`AuthServer listening on port ${port}!`));
