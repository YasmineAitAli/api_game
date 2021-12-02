const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        score: { type: DataTypes.INTEGER, allowNull: false },
    };

    const options = {
        defaultScope: {
            // exclude hash by default
            attributes: { exclude: [] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };

    var score = sequelize.define('Score', attributes, options);
    var user = require('../users/user.model')(sequelize);

    score.belongsTo(user);
    return score
}