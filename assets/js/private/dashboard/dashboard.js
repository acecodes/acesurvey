(function() {

    'use strict';

    function DashboardController(dashboardFactory) {
        this.questionsSeen = [];
        this.questions = dashboardFactory.getQAs(this);
        this.createQuestion = dashboardFactory.createQuestion;
        this.getQAs = dashboardFactory.getQAs;
        this.deleteQuestion = dashboardFactory.deleteQuestion;
        this.deleteAnswer = dashboardFactory.deleteAnswer;
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

                return {
                    createQuestion: createQuestion,
                    getQAs: getQAs,
                    deleteQuestion: deleteQuestion,
                    deleteAnswer: deleteAnswer
                };
            }
        ]);
})();