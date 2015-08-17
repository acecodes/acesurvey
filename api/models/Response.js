/**
* Responses.js
*
* @description :: A response that a user records when answering a question.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {
        title: {
            type: Sequelize.STRING,
            required: false,
            allowNull: true
        }
    },
    options: {
        tableName: 'response'
    }
};

