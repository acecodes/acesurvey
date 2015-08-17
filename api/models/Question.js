/**
 * Question.js
 *
 * @description :: Questions that will be presented to users.
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