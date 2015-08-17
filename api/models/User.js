/**
 * User.js
 *
 * @description :: Basic user model.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

/*
Future improvement: use password machinepack
to encrypt passwords. Note: I would NEVER
use plaintext passwords in a production application.
*/

module.exports = {

    attributes: {

        name: {
            type: Sequelize.STRING,
            required: true
        },

        title: {
            type: Sequelize.STRING
        },

        email: {
            type: Sequelize.STRING,
            email: true,
            required: true,
            unique: true
        },

        password: {
            type: Sequelize.STRING,
            required: true
        },

        admin: {
            type: Sequelize.BOOLEAN,
            required: true
        }
    },
    associations: function() {
        User.hasOne(Response, {
            foreignKey: 'user'
        });
    },
    options: {
        tableName: 'user'
    }
};