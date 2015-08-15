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

            return res.json(newQuestion);
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
    },

    deleteQuestion: function(req, res) {
        Question.destroy({
            where: { id: req.param('id') }
        }).then(function (deleted) {
            return res.json({'msg': 'Successfully deleted'});
        }).catch(function (err) {
            return res.json(err);
        });
    }

};