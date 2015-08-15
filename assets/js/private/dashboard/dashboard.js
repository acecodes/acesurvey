(function() {

    'use strict';

    function DashboardController(dashboardFactory) {
        this.questionsSeen = [];
        this.questions = dashboardFactory.getQAs(this);
        this.createQuestion = dashboardFactory.createQuestion;
        this.getQAs = dashboardFactory.getQAs;
        this.deleteQuestion = dashboardFactory.deleteQuestion;
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
                        scope.questions.push(question);
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
                        params: {id: questionId}
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

                return {
                    createQuestion: createQuestion,
                    getQAs: getQAs,
                    deleteQuestion: deleteQuestion
                };
            }
        ]);
})();