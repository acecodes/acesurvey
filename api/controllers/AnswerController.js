/**
 * AnswerController
 *
 * @description :: Server-side logic for managing answers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	newAnswer: function (req, res) {
        Answer.create({
            answer: req.param('answer'),
            question: req.param('question')
        }).then(function(newAnswer) {

            return res.json({
                id: newAnswer.id
            });
        }).catch(function(err) {
            res.json(err);
            return res.serverError();
        });
    }
};

