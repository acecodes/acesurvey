/**
 * QuestionController
 *
 * @description :: Server-side logic for managing questions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    newQuestion: function(req, res) {
        Question.create({
            title: req.param('title'),
        }).then(function(newQuestion) {

            return res.json({
                id: newQuestion.id
            });
        }).catch(function(err) {
            res.json(err);
            return res.serverError();
        });
    },

    getQA: function(req, res) {
        Question.findAll({
            include: [{
                model: Answer
            }]
        }).then(function(qa) {
            return res.json(qa);
        }).catch(function(err) {
            res.json(err);
        });
    }

};