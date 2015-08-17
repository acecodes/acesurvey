/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    /*
    Check the provided email address and password, and if they
    match a real user in the database, sign in to AceSurvey.
    */
    login: function(req, res) {

        User.findOne({
            where: {
                email: req.param('email'),
                password: req.param('password')
            }
        }).then(function foundUser(user) {

            // Store user id in the user session
            req.session.me = user.id;

            return res.ok();
        }).catch(function userError(err) {
            console.log(err);
            return res.notFound();
        });

    },

    /*
    Sign up for a user account.
    */
    signup: function(req, res) {

        User.create({
            name: req.param('name'),
            title: req.param('title'),
            email: req.param('email'),
            password: req.param('password'),
            admin: !!Number(req.param('admin'))
        }).then(function(newUser) {

            req.session.me = newUser.id;

            return res.json({
                id: newUser.id
            });
        }).catch(function(err) {
            res.json(err);
            return res.serverError();
        });

    },

    logout: function(req, res) {

        // Look up the user record from the database which is
        // referenced by the id in the user session (req.session.me)
        User.findById(req.session.me).then(function foundUser(user) {

            // If session refers to a user who no longer exists, still allow logout.
            if (!user) {
                sails.log.verbose('Session refers to a user who no longer exists.');
                return res.backToHomePage();
            }

            // Wipe out the session (log out)
            req.session.me = null;

            // Either send a 200 OK or redirect to the home page
            return res.backToHomePage();

        });
    }
};