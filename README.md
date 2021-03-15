# Pokedex REST API
This projects accompanies the video course for building a simple Pokedex REST API with NodeJS and ExpressJS.

[Watch the course](https://www.youtube.com/playlist?list=PLSwIxbgo4ojtYwVrLOiX5THfQkrCixMEq)


## Using this repository

This repo has a branch for each video in the course. The branch corresponds to the state of the code at **the end of the video**.

You can fork and clone this repo, or create a new one from scratch and follow along with the videos.

### Video 1: Introduction

[Watch](https://www.youtube.com/watch?v=WHshWCQvg_Q&list=PLSwIxbgo4ojtYwVrLOiX5THfQkrCixMEq&index=1)

_This video makes no code changes_

### Video 2: What is a REST API?

[Watch](https://www.youtube.com/watch?v=bT_n_Sb3J3U&list=PLSwIxbgo4ojtYwVrLOiX5THfQkrCixMEq&index=2)

_This video makes no code changes_

### Video 3: Installing Programs and Tools

[Watch](https://www.youtube.com/watch?v=-i24de_R3Rc&list=PLSwIxbgo4ojtYwVrLOiX5THfQkrCixMEq&index=3)

1. Install [Sublime Text 3](https://www.sublimetext.com/3) or another code text editor (e.g. [Atom](https://atom.io/) or [VS Code](https://code.visualstudio.com/download))
1. Install [Postman](https://www.getpostman.com/downloads/) or another HTTP request client (e.g. [Insomnia](https://insomnia.rest/download))
1. Install [DB Browser for SQLite](https://sqlitebrowser.org/dl/) or other SQLite database browser
1. Install [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
1. Install [Sourcetree](https://www.sourcetreeapp.com/) or other git GUI (e.g. [GitHub Desktop](https://desktop.github.com/))
1. Create a [GitHub account](https://github.com/join)
1. Install [NodeJS (version 14 or higher)](https://nodejs.org/en/download/)

### Video 4: Setting Up the Environment

[Watch](https://www.youtube.com/watch?v=Z3LYzc46C20&list=PLSwIxbgo4ojtYwVrLOiX5THfQkrCixMEq&index=4)

#### Initialize your git repository with Sourcetree

1. Open Sourcetree and click the "+ Create" button (on Windows) or "New..." > "Create Local Repository" (on macOS)
1. Enter the path on your computer where you want to create your repository
1. Enter a name for the repository
1. Click "Create"

#### Initialize your npm package

1. Create a folder in your project's directory called `api`
1. Open a terminal window (Command Prompt on Windows)
1. Change the directory to the path of the `api` folder you created:

```
cd /path/to/your/project/api
```
4. Type `npm init` and press Enter
1. Fill in the information at the prompts that appear, making sure to type `app.js` at the prompt for `entry point`
1. Install Express by typing the following in your terminal (or Command Prompt) window: `npm install express --save`

#### Create the REST API Server

1. Create a file in the `api` directory called `app.js`
1. In `app.js` import Express:

`pokedex-api/api/app.js`
```javascript
const express = require('express');
```

3. Create the server:

`pokedex-api/api/app.js`
```javascript
const app = express();
```

4. Define your server's port:

`pokedex-api/api/app.js`
```javascript
const port = 3000;
```

5. Add a test "Hello World" endpoint:

`pokedex-api/api/app.js`
```javascript
app.get('/hello', (req, res) => {
    res.send('Hello World!');
});
```
6. Start your server listening on your port:

`pokedex-api/api/app.js`
```javascript
app.listen(port, () => console.log(`Pokedex API listening on port ${port}!`));
```

#### Test your First Endpoint

1. Open terminal/command prompt and make sure you're in the directory that `app.js` is located in
1. Start the server by typing `node app.js` and press Enter
 - If everything is working, you should see `Pokedex API listening on port 3000!`
3. Open Postman
1. Click "+" to open a new request tab
1. In the URL bar, type `http://localhost:3000/hello`
1. Click the "Send" button
 -  If everything is working, you should see `Hello World!` in the response pane.
7. Open your terminal/command prompt window and press Ctrl + C to stop the server

### Video 5: Browsing the Data

[Watch](https://www.youtube.com/watch?v=8i41Ii4u8Zc&list=PLSwIxbgo4ojtYwVrLOiX5THfQkrCixMEq&index=5)

1. Download the `pokedex.db` file from this repo and put it in the root directory of your project

### Video 6: Connecting to the Database

[Watch](https://www.youtube.com/watch?v=A8xJpFk4VlU&list=PLSwIxbgo4ojtYwVrLOiX5THfQkrCixMEq&index=6)

#### Create separate routes files

1. In the `api` directory of your project, create another directory called `routes`
1. Move the `/hello` route to a new file and save it in the `routes` directory as `test.js`:

`pokedex-api/api/routes/test.js`
```javascript
app.get('/hello', (req, res) => {
    res.send('Hello World!');
});
```

3. In `app.js`, add environment variables:

`pokedex-api/api/app.js`
```javascript
module.exports.envVars = {
    app,
};
```

4. Import the environment variables into `routes/test.js` (at the top):

`pokedex-api/api/routes/test.js`
```javascript
const { envVars } = module.parent.exports;
const { app } = envVars;
```

5. Import the test routes into `app.js` (after the `envVars` declaration):

`pokedex-api/api/app.js`
```javascript
require(`${__dirname}/routes/test`);
```

6. Run the server in terminal (`node app.js`) and test the Hello World endpoint in Postman to ensure it still works the same
- It works if you see `Hello World!` in the response pane in Postman

#### Connect to the Database with Sequelize

1. Install Sequelize and SQLite by typing `npm install sequelize@5.22.3 sqlite3 --save` in terminal
1. Import Sequelize into `app.js`:

`pokedex-api/api/app.js`
```javascript
const Sequelize = require('sequelize');
```

3. Create the Sequelize object (before the `envVars` declaration):

`pokedex-api/api/app.js`
```javascript
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: `${__dirname}/../pokedex.db`,
});
```

4. Add both the `Sequelize` module and `sequelize` object to your `envVars`:

`pokedex-api/api/app.js`
```javascript
module.exports.envVars = {
    app,
    requires: {
        Sequelize,
        sequelize,
    },
};
```

#### Add Models Corresponding to the Database Tables

1. Create a directory called `models` at the same level as `app.js`
1. Create a new file called `models.js` and save it in the `models` directory
1. Import `envVars` into `models.js`:

`pokedex-api/api/models/models.js`
```javascript
const { envVars } = module.parent.exports;
```

4. Create an empty object to contain all the models and export it:

`pokedex-api/api/models/models.js`
```javascript
const models = {};

module.exports = models;
```

5. Create a new file called `pokemon.js` and save it in the `models` directory. This file will contain the `class` definition for the `Pokemon` model, which will correspond to the `pokemon` table.
1. Export a function from the `pokemon.js` model file and add the class definition inside it:

`pokedex-api/api/models/pokemon.js`
```javascript
module.exports = (envVars) => {
    const { Sequelize, sequelize } = envVars.requires;

    class Pokemon extends Sequelize.Model {}

    Pokemon.init({});

    return Pokemon;
};
```

7. Inside the `Pokemon.init()` method, add a key-value pair for each column in the `pokemon` table (except for `id`, which Sequelize automatically creates, and the `timestamp` columns, which we will define somewhere else). As the value for these key-value pairs, set the datatype. Here is list of [Sequelize datatypes](https://sequelize.org/v5/manual/data-types.html). Make sure your keys are camelCase (which is JavaScript convention) instead of snake_case (like they are in the database):

`pokedex-api/api/models/pokemon.js`
```javascript
    Pokemon.init({
        name: Sequelize.STRING,
        picture: Sequelize.STRING,
        heightInches: Sequelize.INTEGER,
        weightLbs: Sequelize.FLOAT,
        description: Sequelize.STRING,
        baseHp: Sequelize.INTEGER,
        baseAttack: Sequelize.INTEGER,
        baseDefense: Sequelize.INTEGER,
        baseSpecialAttack: Sequelize.INTEGER,
        baseSpecialDefense: Sequelize.INTEGER,
        baseSpeed: Sequelize.INTEGER,
    });
```

8. Add other options to the `Pokemon.init` method:

`pokedex-api/api/models/pokemon.js`
```javascript
    Pokemon.init({
        name: Sequelize.STRING,
        /* ... */
    }, {
        sequelize, // define the database connection
        modelName: 'pokemon', // the name of the table in the database
        freezeTableName: true, // don't allow Sequelize to pluralize the table name when querying (this is only needed on tables where the singular and plural are the same, or where the plural is something weird that Sequelize doesn't know)
        underscored: true, // tell Sequelize to convert the field names to snake_case when querying
        createdAt: 'created', // the name of the created date column in the database
        updatedAt: 'modified', // the name of the updated/modified date column in the database
        deletedAt: 'deleted', // the name of the deleted date column in the database
        paranoid: true, // rather than delete the record when we ask Sequelize to delete it, it will set the deleted date and ignore it in future queries
    });
```

9. Import the `Pokemon` model into `models.js` (after the `models` object declaration):

`pokedex-api/api/models/models.js`
```javascript
models.Pokemon = require(`${__dirname}/pokemon`)(envVars);
```

10. Create individual model files in the same way for each of the tables in the database and import them into `models.js`
1. Define associations between models (based on the relationships between tables). This can get fairly complicated, so it's probably best just to copy and paste the following code into `models.js` after the model imports. If you want to get more info on how this works, check out the [Sequelize associations](https://sequelize.org/v5/manual/associations.html) page. If you're familiar with SQL, the comments above each association may help you understand what's going on.

`pokedex-api/api/models/models.js`
```javascript
// JOIN `evolutionary_stones` to `evolutions` ON `evolution.stone_id = evolutionary_stone.id`
models.Evolution.belongsTo(models.EvolutionaryStone, { as: 'EvolutionaryStone', foreignKey: 'stoneId' });
// JOIN `pokemon` to `evolutions` ON `evolution.pokemon_id = pokemon.id`
models.Evolution.belongsTo(models.Pokemon, { as: 'EvolutionSourcePokemon', foreignKey: 'pokemonId' });
// JOIN `pokemon` to `evolutions` ON `evolution.evolution_id = pokemon.id`
models.Evolution.belongsTo(models.Pokemon, { as: 'EvolutionTargetPokemon', foreignKey: 'evolutionId' });
// JOIN `location_types` to `locations` ON `locations.type_id = location_types.id`
models.Location.belongsTo(models.LocationType, { as: 'LocationType', foreignKey: 'typeId' });
// JOIN `regions` to `locations` ON `locations.region_id = region.id`
models.Location.belongsTo(models.Region, { as: 'Region', foreignKey: 'regionId' });
// JOIN `pokemon_locations` to `locations` ON `pokemon_locations.location_id = locations.id`
// JOIN `pokemon` to `locations` ON `pokemon_locations.pokemon_id = pokemon.id`
models.Location.belongsToMany(models.Pokemon, { as: 'Pokemon', through: 'pokemon_locations', foreignKey: 'locationId' });
// JOIN `move_types` to `moves` ON `moves.type_id = move_types.id`
models.Move.belongsTo(models.Type, { as: 'MoveType', foreignKey: 'typeId' });
// JOIN `move_categories` to `moves` ON `moves.category_id = move_categories.id`
models.Move.belongsTo(models.MoveCategory, { as: 'MoveCategory', foreignKey: 'categoryId' });
// JOIN `evolutions` to `pokemon` ON `evolutions.pokemon_id = pokemon.id`
models.Pokemon.hasMany(models.Evolution, { as: 'Evolutions', foreignKey: 'pokemonId' });
// JOIN `evolutions` to `pokemon` ON `evolutions.evolution_id = pokemon.id`
models.Pokemon.hasMany(models.Evolution, { as: 'Devolutions', foreignKey: 'evolutionId' });
// JOIN `pokemon_locations` to `pokemon` ON `pokemon_locations.pokemon_id = pokemon.id`
// JOIN `locations` to `pokemon` ON `pokemon_locations.location_id = locations.id`
models.Pokemon.belongsToMany(models.Location, { as: 'Locations', through: 'pokemon_locations', foreignKey: 'pokemonId' });
// JOIN `pokemon_moves` to `pokemon` ON `pokemon_moves.pokemon_id = pokemon.id`
// JOIN `moves` to `pokemon` ON `pokemon_moves.move_id = moves.id`
models.Pokemon.belongsToMany(models.Move, { as: 'Moves', through: 'pokemon_moves', foreignKey: 'pokemonId' });
// JOIN `pokemon_trainers` to `pokemon` ON `pokemon_trainers.pokemon_id = pokemon.id`
models.pokemon_types.hasMany(models.PokemonTrainer, { as: 'PokemonTrainers', foreignKey: 'pokemonId' });
// JOIN `pokemon_types` to `pokemon` ON `pokemon_types.pokemon_id = pokemon.id`
// JOIN `types` to `pokemon` ON `pokemon_types.type_id = types.id`
models.Pokemon.belongsToMany(models.Type, { as: 'Types', through: 'pokemon_types', foreignKey: 'pokemonId' });
// JOIN `pokemon_trainers` to `trainers` ON `pokemon_trainers.trainer_id = trainers.id`
// JOIN `pokemon` to `trainers` ON `pokemon_trainers.pokemon_id = pokemon.id`
models.Trainer.belongsToMany(models.Pokemon, { as: 'Pokemon', through: 'pokemon_trainers', foreignKey: 'trainerId' });
// JOIN `locations` to `trainers` ON `trainers.hometown_id = locations.id`
models.Trainer.belongsTo(models.Location, { as: 'Hometown', foreignKey: 'hometownId' });
```

12. Import the models into `app.js` and add it to `envVars` (after the `envVars` declaration):

`pokedex-api/api/app.js`
```javascript
const models = require(`${__dirname}/models/models`);
module.exports.envVars.models = models;
```

#### Create an Endpoint that Uses Data from the DB (GET Pokemon Endpoint)

1. Create a file in the `routes` directory called `pokemon.js`. This will hold on our Pokemon-related endpoints.
1. Import `envVars` into `pokemon.js`:

`pokedex-api/api/routes/pokemon.js`
```javascript
const { envVars } = module.parent.exports;
const { app, models } = envVars;
```

3. Add the GET Pokemon route. This endpoint will serve a list of all the Pokemon in the database:

`pokedex-api/api/routes/pokemon.js`
```javascript
app.get('/pokemon', async (req, res) => {

});
```

4. In the GET Pokemon route function, add a call to Sequelize to get all the Pokemon:

`pokedex-api/api/routes/pokemon.js`
```javascript
    const pokemon = await models.Pokemon.findAll();
```

5. Inside the `.findAll()` method add an `include` (like a `JOIN` in SQL) to also pull back the moves for each Pokemon:

`pokedex-api/api/routes/pokemon.js`
```javascript
    const pokemon = await models.Pokemon.findAll({
        include: [{
            model: models.Move,
            as: 'Moves'
        }],
    });
```

6. Return a response with the Pokemon in it:

`pokedex-api/api/routes/pokemon.js`
```javascript
    return res.send(pokemon);
```

7. In `app.js`, import the `pokemon.js` routes file (in place of the `test.js` routes file import):

`pokedex-api/api/app.js`
```javascript
require(`${__dirname}/routes/pokemon`);
```

8. You can now delete `routes/test.js`
1. In terminal, start your server: `node app.js`
1. Open Postman and test the endpoint. In the URL bar, type `http://localhost:3000/pokemon` and click "Send"
- If everything went well, you should see a pretty large respone array with a bunch of objects representing the Pokemon.
- Currently, the `Moves` array in each Pokemon object will be empty, because there is no moves data in the database.
- Here's an example of one of the Pokemon objects in the response:

```json
{
    "id": 1,
    "name": "Bulbasaur",
    "picture": "https://cdn.bulbagarden.net/upload/2/21/001Bulbasaur.png",
    "heightInches": 28,
    "weightLbs": 15.2,
    "description": "A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon. It can go for days without eating a single morsel. In the bulb on its back, it stores energy. The bulb-like pouch on its back grows larger as it ages. The pouch is filled with numerous seeds.",
    "baseHp": 45,
    "baseAttack": 49,
    "baseDefense": 49,
    "baseSpecialAttack": 65,
    "baseSpecialDefense": 65,
    "baseSpeed": 45,
    "created": 1580795954,
    "modified": 1580795954,
    "deleted": null,
    "Moves": []
}
```

11. If you're familiar with SQL, you can make note of the SQL produced by Sequelize in the console logs in terminal
