/**
 * Answer.js
 *
 * @description :: An answer for a question.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */


module.exports = {

    attributes: {
        answer: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false
        }
    },
    associations: function() {
        Answer.hasOne(Response, {
            foreignKey: 'answer'
        });
    },
    options: {
        tableName: 'answer'
    }
};