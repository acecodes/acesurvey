/**
 * Question.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        title: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false
        }
    },
    associations: function() {
        Question.hasMany(Answer, {
            foreignKey: 'question'
        });
        Question.hasOne(Response, {
            foreignKey: 'question'
        });
    },
    options: {
        tableName: 'question'
    }
};