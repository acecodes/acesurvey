/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    signup: function(req, res) {
        var Passwords = require('machinepack-passwords');

        // Encrypt a string using the BCrypt algorithm.
        Passwords.encryptPassword({
            password: req.param('password'),
        }).exec({
            // An unexpected error occurred.
            error: function(err) {
                res.negotiate(err);
            },
            // OK.
            success: function(encryptedPassword) {
                User.create({
                    name: req.param('name'),
                    title: req.param('title'),
                    email: req.param('email'),
                    password: encryptedPassword,
                    admin: req.param('admin')
                })
            },
        });
    }

};