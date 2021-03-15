const bodyParser = require('body-parser');
const express = require('express');
const Sequelize = require('sequelize');

const app = express();
const port = 3000;

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: `${__dirname}/../pokedex.db`,
});

module.exports.envVars = {
    app,
    requires: {
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

require(`${__dirname}/routes/pokemon`);

app.listen(port, () => console.log(`Pokedex API listening on port ${port}!`));
