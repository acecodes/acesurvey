/**
 * AnswerController
 *
 * @description :: Server-side logic for managing answers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    newAnswer: function(req, res) {
        Answer.create({
            answer: req.param('answer'),
            question: req.param('question')
        }).then(function(newAnswer) {

            return res.json(newAnswer);
        }).catch(function(err) {
            res.json(err);
            return res.serverError();
        });
    },
    deleteAnswer: function(req, res) {
        Answer.destroy({
            where: {
                id: req.param('id')
            }
        }).then(function(deleted) {
            return res.json({
                'msg': 'Successfully deleted'
            });
        }).catch(function(err) {
            return res.json(err);
        });
    }
};