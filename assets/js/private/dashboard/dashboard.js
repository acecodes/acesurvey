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
                    $http.post('/question', { title: title }).then(function success(question) {
                        return res.json(question);
                    }).catch(function failure(err) {
                        return res.json(err);
                    });
                }

                function getQAs(scope) {
                    $http.get('/qa').then(function success(QAs) {
                        scope.questions = QAs.data;
                    });
                }

                function deleteQuestion(scope, questionId) {
                    console.log(scope.questions.data.qaSets);
                }

                return {
                    createQuestion: createQuestion,
                    getQAs: getQAs,
                    deleteQuestion: deleteQuestion
                };
            }
        ]);
})();