/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var Sequelize = require('sequelize');

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
  options: {
        tableName: 'user'
  }
};

