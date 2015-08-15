(function() {

    'use strict';

    function DashboardController(dashboardFactory) {
        this.questionsSeen = [];
    }

    DashboardController.$inject = ['dashboardFactory'];


    var app = angular.module('dashboard', ['toastr', 'compareTo'])
        .directive('dashboarddata', [

            function() {
                return {
                    bindToController: true,
                    controller: DashboardController,
                    controllerAs: 'app'
                };
            }
        ])
        .factory('dashboardFactory', ['$http', 'toastr',
            function($http, toastr) {
                function comingSoon(scope) { }

                return {
                    comingSoon: comingSoon
                };
            }
        ]);
})();
