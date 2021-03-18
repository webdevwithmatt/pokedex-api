const { envVars } = module.parent.exports;
const { app, models } = envVars;

app.get('/pokemon', async (req, res) => {
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
    
    return res.send(pokemon);
});

app.post('/trainer/:trainerId/catch/:pokemonId', async (req, res) => {
    const { trainerId, pokemonId } = req.params;
    const nickname = req.body.nickname || req.query.nickname || null;

    const trainer = await models.Trainer.findByPk(trainerId);
    const pokemon = await models.Pokemon.findByPk(pokemonId);

    if (trainer) {
        if (pokemon) {
            try {
                await models.PokemonTrainer.create({
                    pokemonId,
                    trainerId,
                    nickname,
                    seen: true,
                    caught: true,
                });
            } catch (error) {
                return res.status(500).send({
                    message: 'There was problem catching the Pokemon.',
                    error,
                });
            }
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

    return res.send({
        message: `${trainer.name} caught ${pokemon.name}!`,
    });
});

app.delete('/trainer/:trainerId/release/:pokemonId', async (req, res) => {
    const { trainerId, id } = req.params;

    const trainer = await models.Trainer.findByPk(trainerId);
    const pokemon = await models.Pokemon.findByPk(pokemonId);

    if (trainer) {
        if (pokemon) {
            try {
                await models.PokemonTrainer.destroy({
                    where: {
                        id,
                    }
                });
            } catch (error) {
                return res.status(500).send({
                    message: 'There was problem releasing the Pokemon.',
                    error,
                });
            }
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
    
    return res.send({
        message: `${trainer.name} released ${pokemon.name}. Bye ${pokemon.name}!`,
    });
});
