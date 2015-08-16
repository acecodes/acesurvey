/**
 * ResponsesController
 *
 * @description :: Server-side logic for managing responses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    newResponse: function(req, res) {
        Response.create({
            answer: req.param('answer'),
            question: req.param('question'),
            user: req.param('user')
        }).then(function(newResponse) {

            return res.json({
                id: newResponse.id
            });
        }).catch(function(err) {
            res.json(err);
            return res.serverError();
        });
    },

    getResponses: function(req, res) {
        Response.findAll({
            where: {
                question: req.param('question')
            },
        }).then(function(responses) {
            res.json(responses);
        }).catch(function(err) {
            res.json(err);
        });
    },

    getUserResponses: function(req, res) {
        Response.findAll({
            where: {
                user: req.param('user')
            },
        }).then(function(responses) {
            res.json(responses);
        }).catch(function(err) {
            res.json(err);
        });
    }
};