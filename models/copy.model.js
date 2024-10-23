module.exports = (sequelize, type) => {
    const Copy = sequelize.define('copies', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        number: type.INTEGER,
        format: type.STRING,
        status: type.STRING
    });
    return Copy;
};