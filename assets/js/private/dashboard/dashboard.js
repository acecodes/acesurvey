(function() {

    'use strict';

    function DashboardController(dashboardFactory) {
        this.questionsSeen = [];
        this.currentQuestion = {};
        this.questionsList = [];
        this.done = false;
        this.responses = false;
        this.userId = window.SAILS_LOCALS.me.id;

        this.adminQuestionsList = dashboardFactory.getQAs(this);
        this.createQuestion = dashboardFactory.createQuestion;
        this.createAnswer = dashboardFactory.createAnswer;
        this.getQAs = dashboardFactory.getQAs;
        this.deleteQuestion = dashboardFactory.deleteQuestion;
        this.deleteAnswer = dashboardFactory.deleteAnswer;
        this.submitResponse = dashboardFactory.submitResponse;
        this.presentQuestion = dashboardFactory.presentQuestion(this);
        this.checkResponses = dashboardFactory.checkResponses;
    }

    DashboardController.$inject = ['dashboardFactory'];


    var app = angular.module('dashboard', [])
        .directive('dashboarddata', [

            function() {
                return {
                    bindToController: true,
                    controller: DashboardController,
                    controllerAs: 'dashboard'
                };
            }
        ])
        .factory('dashboardFactory', ['$http',
            function($http) {

                function createQuestion(scope, title) {
                    $http.post('/question', {
                        title: title
                    }).then(function success(question) {
                        console.log(question);
                        scope.questions.push(question.data);
                    }).catch(function failure(err) {
                        console.log(err);
                    });
                }

                function getQAs(scope) {
                    $http.get('/qa').then(function success(QAs) {
                        scope.questions = QAs.data;
                    });
                }

                function deleteQuestion(scope, questionId) {

                    $http.delete('/question', {
                        params: {
                            id: questionId
                        }
                    }).then(function success(deleted) {
                        console.log(deleted);
                        var arr = scope.questions;
                        var len = arr.length;

                        for (var i = 0; i < len; i++) {
                            if (arr[i].id === questionId) {
                                arr.splice(i, 1);
                                break;
                            }
                        }
                    }).catch(function error(err) {
                        console.log(err);
                    });

                }

                function createAnswer(scope, questionId, answer) {
                    $http.post('/answer', {
                        question: questionId,
                        answer: answer
                    }).then(function success(answer) {
                        var arr = scope.questions;
                        var len = arr.length;
                        for (var i = 0; i < len; i++) {
                            if (arr[i].id === questionId) {

                                if (arr[i].Answers === undefined) {
                                    arr[i].Answers = [];
                                }

                                var answers = arr[i].Answers;
                                answers.push(answer.data);
                                break;
                            }
                        }
                    }).catch(function failure(err) {
                        console.log(err);
                    });
                }

                function deleteAnswer(scope, questionId, answerId) {

                    var arr = scope.questions;
                    var len = arr.length;

                    $http.delete('/answer', {
                        params: {
                            id: answerId
                        }
                    }).then(function success(deleted) {
                        console.log(deleted);
                        var arr = scope.questions;
                        var len = arr.length;

                        for (var i = 0; i < len; i++) {
                            if (arr[i].id === questionId) {
                                var answers = arr[i].Answers;
                                for (var j = 0; j < answers.length; j++) {
                                    if (answers[j].id === answerId) {
                                        answers.splice(j, 1);
                                        break;
                                    }
                                }
                            }
                        }
                    }).catch(function error(err) {
                        console.log(err);
                    });

                }

                function submitResponse(scope, questionId, answerId, userId) {
                    $http.post('/response', {
                        answer: answerId,
                        question: questionId,
                        user: userId
                    }).then(function success(success) {

                        var qList = scope.questionsList;
                        console.log(scope.questionsList);
                        qList.shift();
                        if (qList.length === 0) {
                            scope.done = true;
                            console.log('Done');
                        } else {
                            scope.currentQuestion = qList[0];
                        }




                    }).catch(function failure(err) {
                        console.log(err);
                    });
                }

                function presentQuestion(scope) {

                    var userId = scope.userId;

                    $http.get('/qa').then(function success(QAs) {
                        $http.get('/user-response', {
                            params: {
                                user: userId
                            }
                        }).then(function(responses) {

                            console.log(QAs.data);
                            console.log(responses.data);

                            var qa = QAs.data;
                            var seen = scope.questionsSeen;
                            var resp = responses.data;
                            var len = resp.length;

                            for (var i = 0; i < len; i++) {
                                seen.push(resp[i].question);
                            }

                            var qaLen = qa.length;
                            for (var j = 0; j < qaLen; j++) {
                                if (qaLen > 0) {
                                    for (var k = 0; k < seen.length; k++) {
                                        if (qa[j] !== undefined && qa[j].id === seen[k]) {
                                            qa.splice(1, j);
                                        }
                                    }
                                } else {
                                    scope.done = true;
                                    break;
                                }
                            }


                            console.log('Questions left:', qa.length);
                            console.log('Questions seen:', scope.questionsSeen);

                            scope.questionsList = _.shuffle(qa);
                            scope.currentQuestion = scope.questionsList[0];


                        });
                    });
                }

                function checkResponses(scope, questionId) {
                    $http.get('/response', {
                        params: {
                            question: questionId
                        }
                    }).then(function success(success) {
                        scope.responses = success.data;
                        console.log(success.data);
                    });
                }



                return {
                    createQuestion: createQuestion,
                    createAnswer: createAnswer,
                    getQAs: getQAs,
                    deleteQuestion: deleteQuestion,
                    deleteAnswer: deleteAnswer,
                    submitResponse: submitResponse,
                    presentQuestion: presentQuestion,
                    checkResponses: checkResponses
                };
            }
        ]);
})();