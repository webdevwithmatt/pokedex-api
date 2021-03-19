require('dotenv').config();

const bodyParser = require('body-parser');
const express = require('express');
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const { spawn } = require('child_process');

const app = express();
const port = 3000;

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: `${__dirname}/../pokedex.db`,
});

module.exports.envVars = {
    app,
    middleware: {},
    requires: {
    	jwt,
    	Sequelize,
    	sequelize,
    },
};

const models = require(`${__dirname}/models/models`);
module.exports.envVars.models = models;

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    return next();
});

module.exports.envVars.middleware = { auth: require(`${__dirname}/middleware/auth`) };

require(`${__dirname}/routes/pokemon`);

const child = spawn('node', ['authServer.js']);
child.stdout.on('data', (chunk) => {
    console.log('[AuthServer]', `${chunk}`.trim());
});
child.on('close', (code) => {
    console.log(`AuthServer exited with code ${code}`);
});

process.on('exit', () => {
    child.stdin.pause();
    child.kill();
    sequelize.close();
});

app.listen(port, () => console.log(`Pokedex API listening on port ${port}!`));
