module.exports = (Sequelize, config) => {
    const options = {
        dialect: 'sqlite',
        storage: "./cl1.db",
        define: { timestamps: false }
    };
    
    const sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, options);

    const Model = require('./model')(Sequelize, sequelize);

    return {
        model: Model,
        sequelize,
        Sequelize,
    }
};