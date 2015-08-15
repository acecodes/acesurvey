/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var Sequelize = require('sequelize');

module.exports = {

  attributes: {

    // The user's full name
    // e.g. Nikola Tesla
    name: {
      type: Sequelize.STRING,
      required: true
    },

    // The user's title at their job (or something)
    // e.g. Genius
    title: {
      type: Sequelize.STRING
    },

    // The user's email address
    // e.g. nikola@tesla.com
    email: {
      type: Sequelize.STRING,
      email: true,
      required: true,
      unique: true
    },

    // The encrypted password for the user
    // e.g. asdgh8a249321e9dhgaslcbqn2913051#T(@GHASDGA
    password: {
      type: Sequelize.STRING,
      required: true
    },
    admin: {
      type: Sequelize.BOOLEAN,
      required: true
    }
  }
};

