/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        required: true,
        allowNull: false,
        unique: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      required: true
    },
    title: {
      type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false
    },
    admin: {
        type: Sequelize.BOOLEAN,
        required: true,
        allowNull: false,
        defaultValue: false
    }
  },
  options: {
    tableName: 'user',
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};

