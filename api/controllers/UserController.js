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
            password: req.body.password,
            difficulty: 10,
        }).exec({
            // An unexpected error occurred.
            error: function(err) {
                res.negotiate(err);
            },
            // OK.
            success: function(encryptedPassword) {
                User.create({
                    name: req.body.name,
                    title: req.body.title,
                    email: req.body.email,
                    password: encryptedPassword,
                    admin: !!Number(req.body.admin)
                });

                return res.json({
                    msg: 'New user created.'
                });
            },
        });
    }

};