module.exports = (envVars) => {
    const { Sequelize, sequelize } = envVars.requires;

    class Pokemon extends Sequelize.Model {}

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
    }, {
        sequelize,
        modelName: 'pokemon',
        freezeTableName: true,
        underscored: true,
        createdAt: 'created',
        updatedAt: 'modified',
        deletedAt: 'deleted',
        paranoid: true,
    });

    return Pokemon;
};
