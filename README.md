# Pokedex REST API
This projects accompanies the video course for building a simple Pokedex REST API with NodeJS and ExpressJS.

[Watch the course](https://www.youtube.com/playlist?list=PLSwIxbgo4ojtYwVrLOiX5THfQkrCixMEq)

[![youtube_social_icon_red](https://user-images.githubusercontent.com/36934493/112694423-f0e08400-8e47-11eb-9fc4-47539085454b.png)](https://www.youtube.com/channel/UCTaM-aIupL05-N30REc69eA)


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

### Video 7: Git & Sourcetree

[Watch](https://www.youtube.com/watch?v=u3Der7M685g&list=PLSwIxbgo4ojtYwVrLOiX5THfQkrCixMEq&index=7)

1. If you haven't already done so, create a `.gitignore` file at the top level of your project:

`pokedex-api/.gitignore`
```
*/node_modules/
```

2. Stage your changes and commit it
1. Create a new branch and name it `more_routes`

### Video 8: Add More Routes: Catch Pokemon Endpoint

[Watch](https://www.youtube.com/watch?v=gnV2IhX_SKc&list=PLSwIxbgo4ojtYwVrLOiX5THfQkrCixMEq&index=8)

#### Body-Parser Middleware

1. Install body-parser in terminal: `npm install body-parser --save`
1. Import body-parser into `app.js`:

`pokedex-api/api/app.js`
```javascript
const bodyParser = require('body-parser');
```

3. Just before the routes imports in `app.js`, use body-parser as middleware for requests and responses to parse both request bodies and response bodies as JSON:

`pokedex-api/api/app.js`
```javascript
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    return next();
});
```

#### Add More Data to the GET Pokemon Endpoint

4. Add more includes to the Sequelize call in the GET Pokemon endpoint:

`pokedex-api/api/routes/pokemon.js`
```javascript
    const pokemon = await models.Pokemon.findAll({
        include: [{
            model: models.Evolution,
            as: 'Evolutions',
            include: [{
                model: models.Pokemon,
                as: 'EvolutionTargetPokemon',
            }],
        }, {
            model: models.Evolution,
            as: 'Devolutions',
                include: [{
                model: models.Pokemon,
                as: 'EvolutionSourcePokemon',
            }],
        }, {
            model: models.Location,
            as: 'Locations',
        }, {
            model: models.Move,
            as: 'Moves',
        }, {
            model: models.Type,
            as: 'Types',
        }],
    });
```

5. Save that file and test it by starting your server in terminal (`node app.js`) and sending the request in Postman.
- If it worked, you should see more data in each Pokemon object in the response, such as `Evolutions`, `Locations`, etc.

#### Create the Catch Pokemon Endpoint

1. Create the Catch Pokemon endpoint (this one is a POST request instead of a GET):

`pokedex-api/api/routes/pokemon.js`
```javascript
app.post('/trainer/:trainerId/catch/:pokemonId', async (req, res) => {

});
```
- Note the `:trainerId` and `:pokemonId` in the path. These are placeholders for actually IDs that we can pass in when we send the request, e.g. `/trainer/2/catch/4`, meaning trainer 2 will catch Pokemon 4.

2. Assign the client input to variables:

`pokedex-api/api/routes/pokemon.js`
```javascript
    const { trainerId, pokemonId } = req.params; // get these from the path variables
    const nickname = req.body.nickname || req.query.nickname || null; // get this from the body, or if undefined, from the query string
```

3. Retrieve the trainer and Pokemon records corresponding to the IDs passed in by the client:

`pokedex-api/api/routes/pokemon.js`
```javascript
    const trainer = await models.Trainer.findByPk(trainerId);
    const pokemon = await models.Pokemon.findByPk(pokemonId);
```

4. Check to make sure the trainer and Pokemon were found, and if so, create a new Pokemon-Trainer association (signifying the Pokemon was caught by that trainer):

`pokedex-api/api/routes/pokemon.js`
```javascript
    if (trainer) {
        if (pokemon) {
            await models.PokemonTrainer.create({
                pokemonId,
                trainerId,
                nickname,
                seen: true,
                caught: true,
            });
        } else {

        }
    } else {

    }
```

5. If the trainer or Pokemon were **NOT** found, send an error response back to the client:

`pokedex-api/api/routes/pokemon.js`
```javascript
    if (trainer) {
        if (pokemon) {
            /* ... */
        } else {
            return res.status(404).send({
                message: `Pokemon ${pokemonId} not found`,
            });
        }
    } else {
        return res.status(404).send({
            message: `Trainer ${trainerId} not found`,
        });
    }
```

6. At the end of the function, return a message stating that the request was successful:

`pokedex-api/api/routes/pokemon.js`
```javascript
    return res.send({
        message: `${trainer.name} caught ${pokemon.name}!`,
    });
```

7. Because Sequelize transactions can be prone to errors, wrap the `PokemonTrainer.create()` call in a `try-catch` block and send an error response if it catches an error:

`pokedex-api/api/routes/pokemon.js`
```javascript
            try {
                await models.PokemonTrainer.create({
                    /* ... */
                });
            } catch (error) {
                return res.status(500).send({
                    message: 'There was problem catching the Pokemon.',
                    error,
                });
            }
```

8. Save the file and start your server (`node app.js`)
1. In Postman, open a new tab and change the request method to "POST"
1. Type `http://localhost:3000/trainer/:trainerId/catch/:pokemonId` in the URL bar
1. Under "Path Variables", enter a trainer ID and Pokemon ID (must exist in the database)
1. Optionally add a nickname for the Pokemon you're going to catch in one of two ways. Assuming your Pokemon's nickname will be "Charmy":
- Append this to the URL `?nickname=Charmy` (this is a query string)
- Go to the "Body" tab and change the body type in the dropdown to "raw". In the second dropdown, change it to "JSON". Add this JSON to your body:

```json
{
    "nickname": "Charmy"
}
```

13. Click "Send" and you should see this response (assuming you used trainer ID 2 and Pokemon ID 4):

```json
{
    "message": "Gary Oak caught Charmander!"
}
```
- You should also see a new record appear in the `pokemon_trainers` table in your database

### Video 9: Add More Routes: Release Pokemon Route

[Watch](https://www.youtube.com/watch?v=xq--TDhYcbw&list=PLSwIxbgo4ojtYwVrLOiX5THfQkrCixMEq&index=9)

1. Add a Release Pokemon route to `routes/pokemon.js` (with a method of DELETE instead of POST):

`pokedex-api/api/routes/pokemon.js`
```javascript
app.delete('/trainer/:trainerId/release/:id', async (req, res) => {

});
```
- Note, the `:id` param refers to an `id` in the `pokemon_trainers` table

2. Assign the client input to variables:

`pokedex-api/api/routes/pokemon.js`
```javascript
    const { trainerId, id } = req.params;
```

3. Retrieve the trainer and Pokemon records corresponding to the IDs passed in by the client. To get the Pokemon, we'll need to join the `pokemon` to the `pokemon_trainers` table:

`pokedex-api/api/routes/pokemon.js`
```javascript
    const trainer = await models.Trainer.findByPk(trainerId);
    const pokemon = await models.Pokemon.findOne({
        include: [{
            model: models.PokemonTrainer,
            as: 'PokemonTrainer',
            where: {
                id,
            },
        }],
    });
```

4. Similar to how we did it in the Catch Pokemon endpoint, check to make sure the trainer and Pokemon were found, but this time, delete the Pokemon-Trainer association (signifying the Pokemon was released by that trainer):

`pokedex-api/api/routes/pokemon.js`
```javascript
    if (trainer) {
        if (pokemon) {
            try {
                await models.PokemonTrainer.destroy({
                    where: {
                        id,
                    }
                });
            } catch (error) {

            }
        } else {

        }
    } else {

    }
```

5. If the trainer or Pokemon were **NOT** found, send an error response back to the client:

`pokedex-api/api/routes/pokemon.js`
```javascript
    if (trainer) {
        if (pokemon) {
            /* ... */
        } else {
            return res.status(404).send({
                message: `PokemonTrainer ${id} not found`,
            });
        }
    } else {
        return res.status(404).send({
            message: `Trainer ${trainerId} not found`,
        });
    }
```

6. At the end of the function, return a message stating that the request was successful:

`pokedex-api/api/routes/pokemon.js`
```javascript
    return res.send({
        message: `${trainer.name} released ${pokemon.name}. Bye ${pokemon.name}!`,
    });
```

7. If there was an error deleting the record, send an error response:

`pokedex-api/api/routes/pokemon.js`
```javascript
            try {
                await models.PokemonTrainer.create({
                    /* ... */
                });
            } catch (error) {
                return res.status(500).send({
                    message: 'There was problem releasing the Pokemon.',
                    error,
                });
            }
```

8. Save the file and start your server (`node app.js`)
1. In Postman, open a new tab and change the request method to "DELETE"
1. Type `http://localhost:3000/trainer/:trainerId/release/:id` in the URL bar
1. Under "Path Variables", enter a trainer ID and PokemonTrainer ID (must exist in the database)
1. Click "Send" and you should see this response (assuming you used trainer ID 2 and PokemonTrainer ID 1):

```json
{
    "message": "Gary Oak released Charmander. Bye Charmander!"
}
```
- You should also see the record in the `pokemon_trainers` table with a `deleted` date

### Video 10: Authentication: Setup

[Watch](https://www.youtube.com/watch?v=-kICsWb_Yqc&list=PLSwIxbgo4ojtYwVrLOiX5THfQkrCixMEq&index=10)

1. In terminal, install some more packages:

```
npm install bcrypt dotenv jsonwebtoken child_process --save
```

2. Create a file called `.sample.env` at the same level as your `app.js` file and add the following to it:

`pokedex-api/api/.sample.env`
```
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
MIN_PASSWORD_LENGTH=
```

3. Copy that file and name the new file `.env`
1. Add `.env` to your `.gitignore` file
1. In terminal, generate an access token secret and refresh token secret:

```
node
```
```
require('crypto').pseudoRandomBytes(64).toString('hex');
```
```
require('crypto').pseudoRandomBytes(64).toString('hex');
```
```
.exit
```

6. Copy and paste the first output of the `pseudoRandomBytes` method as the value of `ACCESS_TOKEN_SECRET` in `.env` and the second output as the value of `REFRESH_TOKEN_SECRET`. Then set `MIN_PASSWORD_LENGTH` to the number of characters you want to require for a new user's password, such as 10:

`pokedex-api/api/.env`
```
ACCESS_TOKEN_SECRET=268c5eaa6001ab4eda0b53588828e8fa9090b90aac24da334f9912bb3fa75a6856a95f4baabf29b6220a52370fd9a4972741f56beb460bd53d483e6d54303916
REFRESH_TOKEN_SECRET=333996bceb99760d5ab245687aa178fda68c79b2617e5e00ad4ee68a870a56bdc173bdd86e7ad8f80ff2e2b6886cf6229e5d87840fe4c48f9550381206926f46
MIN_PASSWORD_LENGTH=10
```

7. Import the properties from `.env` into `app.js` (at the top):

`pokedex-api/api/app.js`
```javascript
require('dotenv').config();
```

8. Import `jsonwebtoken` into `app.js`:

`pokedex-api/api/app.js`
```javascript
const jwt = require('jsonwebtoken');
```

9. Add `jwt` to `envVars.requires` in `app.js`:

`pokedex-api/api/app.js`
```javascript
module.exports.envVars = {
    app,
    requires: {
        jwt,
    	Sequelize,
    	sequelize,
    },
};
```

10. Close the Sequelize connection when the server quits (just before the `app.listen` call):
`pokedex-api/api/app.js`
```javascript
process.on('exit', () => {
    sequelize.close();
});
```


11. Copy `app.js` and name the new file `authServer.js`. This will be a separate server that runs alongside our main server to keep authentication separate for added security. The differences are as follows:

`pokedex-api/api/authServer.js`
```diff
require('dotenv').config();

+ const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const express = require('express');
const jwt = require('jsonwebtoken');
+ const path = require('path');
const Sequelize = require('sequelize');

- const app = express();
+ const authServer = express();
- const port = 3000;
+ const port = 4000;

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: `${__dirname}/../pokedex.db`,
});

module.exports.envVars = {
-     app,
+     authServer,
    requires: {
+         bcrypt,
        jwt,
+         path,
    	Sequelize,
    	sequelize,
    },
};

const models = require(`${__dirname}/models/models`);
module.exports.envVars.models = models;

- app.use(bodyParser.json());
+ authServer.use(bodyParser.json());
- app.use((req, res, next) => {
+ authServer.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    return next();
});

- require(`${__dirname}/routes/pokemon`);
+ require(`${__dirname}/routes/auth`);

process.on('exit', () => {
    sequelize.close();
});

- app.listen(port, () => console.log(`Pokedex API listening on port ${port}!`));
+ authServer.listen(port, () => console.log(`AuthServer listening on port ${port}!`));

```

12. Import `child_process.spawn` into `app.js` to start the Auth Server when the main server starts:

`pokedex-api/api/app.js`
```javascript
const { spawn } = require('child_process');
```

13. Run the Auth Server within the main server. Just before the `process.on('exit')` definition in `app.js`, add this:

`pokedex-api/api/app.js`
```javascript
const child = spawn('node', ['authServer.js']);
```

14. Print the output from the Auth Server in the main server's logs:

`pokedex-api/api/app.js`
```javascript
child.stdout.on('data', (chunk) => {
    console.log('[AuthServer]', `${chunk}`.trim());
});
```

15. Log a message if the Auth Server quits:

`pokedex-api/api/app.js`
```javascript
child.on('close', (code) => {
    console.log(`AuthServer exited with code ${code}`);
});
```

16. Close the Auth Server when the main server quits (add this within the existing `process.on('exit')` callback function):

`pokedex-api/api/app.js`
```javascript
    child.stdin.pause();
    child.kill();
```

#### Add the Authentication Middleware

1. Create a new directory at the same level as `app.js` called `middleware`
1. Create a new file named `auth.js` and save it in the `middleware` directory
1. Import dependencies:

`pokedex-api/api/middleware/auth.js`
```javascript
const { envVars } = module.parent.exports;
const { jwt } = envVars.requires;
```

4. Create the token authenticator middleware function:

`pokedex-api/api/middleware/auth.js`
```javascript
module.exports.authenticateToken = (req, res, next) => {

};
```

5. In the middleware function, retrieve the access token from the Authorization header:

`pokedex-api/api/middleware/auth.js`
```javascript
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];
```

6. If the client didn't pass in a token, send an error response:

`pokedex-api/api/middleware/auth.js`
```javascript
    if (!token) {
        return res.status(401).send({
            message: 'Unauthorized',
        });
    }
```

7. Otherwise, verify the token against the `ACCESS_TOKEN_SECRET`:

`pokedex-api/api/middleware/auth.js`
```javascript
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, trainer) => {

    });
```

8. In the callback function, check if `err` is undefined (signifying that the token is invalid, or possibly some other error), and if so, send an error response:

`pokedex-api/api/middleware/auth.js`
```javascript
        if (err) {
            return res.status(403).send({
                message: 'Forbidden',
            });
        }
```

9. If the token checks out, add the `trainer` (i.e. user) object to the request and pass it along the request chain:

`pokedex-api/api/middleware/auth.js`
```javascript
        req.trainer = trainer;
        return next();
```

10. Make the middleware available to other routes by first adding a `middleware` object to the `envVars`:

`pokedex-api/api/app.js`
```javascript
module.exports.envVars = {
    app,
    middleware: {},
    requires: {
        jwt,
    	Sequelize,
    	sequelize,
    },
};
```

11. Then add the auth middleware we created to this object (just after the exist `app.use()` middleware methods):

`pokedex-api/api/app.js`
```javascript
module.exports.envVars.middleware = { auth: require(`${__dirname}/middleware/auth`) };
```

12. Test the server to make sure both the normal server and auth server start without errors (`node app.js`):
- If successful, you should see the following messages:
```
Pokedex API listening on port 3000!
AuthServer listening on port 4000!
```
- If you get a message saying `AuthServer exited with code`, you can see what the error is by running `node authServer.js`

### Video 11: Authentication: Register Endpoint

[Watch](https://www.youtube.com/watch?v=1aRkjAxVP3w&list=PLSwIxbgo4ojtYwVrLOiX5THfQkrCixMEq&index=11)

1. Create a file in the `routes` directory called `auth.js`.
1. Import dependencies into the `auth.js` route file:

`pokedex-api/api/routes/auth.js`
```javascript
const { envVars } = module.parent.exports;
const { authServer, models } = envVars;
const { bcrypt, jwt, Sequelize } = envVars.requires;
const { Op } = Sequelize;
const { promisify } = require('util');
```

3. Start creating the register route:

`pokedex-api/api/routes/auth.js`
```javascript
authServer.post('/register', async (req, res) => {

});
```

4. Retrieve params from the request body:

`pokedex-api/api/routes/auth.js`
```javascript
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
```

5. Validate the password. If no password was supplied, or the password is less than the minimum required size, send an error response:

`pokedex-api/api/routes/auth.js`
```javascript
    if (!password || password.length() < parseInt(process.env.MIN_PASSWORD_LENGTH, 10)) {
        return res.status(400).send({
            message: 'There was a problem registering. Make sure your password follows the guidelines.',
        });
    }
```

6. Validate the name, username, and email fields. If they are null, send an error response:

`pokedex-api/api/routes/auth.js`
```javascript
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
```

7. Salt and hash the password, then store the new trainer (i.e. user) in the database:

`pokedex-api/api/routes/auth.js`
```javascript
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
    } catch (error) {

    }
```

8. If the trainer is created successfully, send a success response. Otherwise, check if it failed because the trainer already exists, and send the appropriate error response:

`pokedex-api/api/routes/auth.js`
```javascript
    try {
        /* ... */

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
```

#### Test the Register Endpoint

1. Start your server (`node app.js`)
1. Open a new tab in Postman
1. Select "POST" as the method from the dropdown menu
1. Enter `http://localhost:4000/register` in the URL bar
1. Click on the "Body" tab
1. Select "raw" as the body type, and "JSON" as the secondary type from the dropdown menus
1. Add a request body with user info, for example:

```json
{
    "name": "Matt",
    "username": "matt",
    "email": "matt@pokemon.fakenet",
    "password": "P@s$w0rd123!",
    "hometownId": 26,
    "gender": "m",
    "birthday": "01-01-1980"
}
```

8. Click "Send"
- If successful, you should see a new record appear in the `trainers` table

### Video 12: Authentication: Log In Endpoint

1. Create a function to generate the date/time at which the access token will expire, and also set a default access token expiration time (in minutes):
`pokedex-api/api/routes/auth.js`
```javascript
const expiresInMinutes = 30;

const getExpiresAt = (minutes) => {
    let expiresAt = new Date();
    return new Date(expiresAt.getTime() + (minutes * 60 * 1000));
};
```

2. Create a couple of functions to generate the access and refresh tokens:
`pokedex-api/api/routes/auth.js`
```javascript
const generateAccessToken = (payload) => promisify(jwt.sign)(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: `${expiresInMinutes}m` });

const generateRefreshToken = (payload) => promisify(jwt.sign)(payload, process.env.REFRESH_TOKEN_SECRET);
```

3. Create a new "POST" route in the `auth.js` routes file:

`pokedex-api/api/routes/auth.js`
```javascript
authServer.post('/login', async (req, res) => {

});
```

4. Check to make sure either the email or username field has been sent to the server in the request, and send an error response if not:
`pokedex-api/api/routes/auth.js`
```javascript
    if (!req.body.username && !req.body.email) {
        return res.status(401).send({
            message: 'There was a problem logging in. Please check to make sure your email and password are correct and try again.',
        });
    }
```
- Note: We want to keep this message fairly generic for security purposes. We don't want to give more specific information about what was wrong with the request (i.e. was it the email that was wrong, or maybe the password?) because an intruder could use this to help themselves gain access.

5. Find the trainer record in the database based on the email OR username that was sent with the request:

`pokedex-api/api/routes/auth.js`
```javascript
    const trainer = await models.Trainer.findOne({
        where: {
            [Op.and]: {
                ...(req.body.email ? { email: req.body.email } : {}),
                ...(req.body.username ? { username: req.body.username } : {}),
            }
        },
        raw: true,
    });
```
- There are a few interesting things going on here. Let's break it down:
  - `models.Trainer.findOne` finds only one trainer (rather than a list of them) in the database that match the where conditions
  - The `[Op.and]` key creates a composite condition made up of the sub-conditions inside the value object all added together with the `AND` operator, producting SQL such as the following:
  ```
  WHERE email = 'someone@nomail.net' AND username = 'someuser123'
  ```
  - `raw: true` is just saying that all we want is the data stored in the database, not all the extra properties that usually exist on Sequelize objects
  - `const myVar = someVariable ? someValue : anotherValue` is a ternary, which is essentially a one-line `if` statement. The expression before the `?` is the condition to check, so here we are checking if `someVariable` is defined, and if so, we set the value of `myVar` equal to `someValue`, otherwise we set the value of `myVar` equal to `anotherValue`. In our situation, we aren't setting the value of a specific variable equal to anything, but more on that next.
  - Putting the spread operator `...` before an object `...{ someKey: someValue }` inside another object `{ ...{ someKey: someValue } }` take all the key-value pairs from the inside object and adds them to the outside object
  - Putting this all together like so `...(req.body.email ? { email: req.body.email } : {})` makes it so that we check if `req.body.email` is defined. If so, we add all the keys in this object `{ email: req.body.email }` to the `[Op.and]` object, otherwise we leave it blank.
  - So essentially what we are doing is checking both the email and username sent to the server in the request and finding the trainer that has an email and username to match both. However, if only one is set, that is okay too, as we want to allow our users to login with either their email or username.

6. Check to make sure `trainer` is defined, i.e. the trainer exists in the database. If not, send an error response:

`pokedex-api/api/routes/auth.js`
```javascript
    if (!trainer) {
        return res.status(401).send({
            message: 'There was a problem logging in. Please check to make sure your email and password are correct and try again.',
        });
    }
```
- Note: Once again, we want to keep this message fairly generic for security purposes. See the note on step #2 for more info.

7. Verify the password and send an error response if it's incorrect:

`pokedex-api/api/routes/auth.js`
```javascript
    try {
        if (!(await bcrypt.compare(req.body.password, trainer.password))) {
            return res.status(401).send({
                message: 'There was a problem logging in. Please check to make sure your email and password are correct and try again.',
            });
        }
    } catch (error) {

    }
```

8. If the password is correct, generate a new set of tokens and store a hashed refresh token in the database:

`pokedex-api/api/routes/auth.js`
```javascript
    let accessToken = null;
    let refreshToken = null;

    try {
        /* ... */

        accessToken = await generateAccessToken(trainer);
        refreshToken = await generateRefreshToken(trainer);

        const salt = await bcrypt.genSalt();
        const hashedRefreshToken = await bcrypt.hash(refreshToken, salt);

        await models.Token.create({
            trainerId: trainer.id,
            refreshToken: hashedRefreshToken,
        });
    } catch (error) {

    }
```

9. If there was an error in this process, or if the access token or refresh token were not generated, send an error response (in two places):

`pokedex-api/api/routes/auth.js`
```javascript
    try {
        /* ... */
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
```

10. If everything worked as expected, i.e. the tokens were generated and stored correctly, we can send a success response with the tokens back to the client:

`pokedex-api/api/routes/auth.js`
```javascript
    return res.send({
        expiresInSeconds: expiresInMinutes * 60,
        expiresAt: getExpiresAt(expiresInMinutes),
        accessToken,
        refreshToken,
    });
```

#### Test the Log In Endpoint

1. Start your server (`node app.js`)
1. Open a new tab in Postman
1. Select "POST" as the method from the dropdown menu
1. Enter `http://localhost:4000/login` in the URL bar
1. Click on the "Body" tab
1. Select "raw" as the body type, and "JSON" as the secondary type from the dropdown menus
1. Add a request body with the username or email and the password for the trainer you created previously, for example:

```json
{
    "email": "matt@pokemon.fakenet",
    "password": "P@s$w0rd123!"
}
```
- You should test sending both a username and an email to make sure the logic works both ways
- If you want to use any of the sample trainers in the `trainers` table, the password for all of them is the same: "`iWannaB3teHV3ry3est`"

8. Click "Send"
- If successful, you should see a response with an access token and refresh token
- You should also see the date/time that the access token expires at in the response.
9. Save the access and refresh tokens somewhere for later use.
