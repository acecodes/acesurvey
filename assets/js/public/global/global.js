(function() {
    'use strict';

    /*
    This exists solely so I can put certain repeated elements,
    such as the navbar, into reusable templates.
    */

    function GlobalController() {
        if (window.SAILS_LOCALS.me !== undefined) {
        this.userId = window.SAILS_LOCALS.me.id;
    } else {
        this.userId = false;
    }
    }

    GlobalController.$inject = [];

    var app = angular.module('globals', [])
        .directive('globals', [

            function() {
                return {
                    bindToController: true,
                    controller: GlobalController,
                    controllerAs: 'globals'
                };
            }
        ])
        .directive('navbar', [
            function() {
                return {
                    restrict: 'E',
                    templateUrl: '/angular-templates/navbar.html'
                };
            }
        ])
        .directive('dashboardnav', [
            function() {
                return {
                    restrict: 'E',
                    templateUrl: '/angular-templates/dashboardnav.html'
                };
            }
        ])        
        .directive('footercontent', [
            function() {
                return {
                    restrict: 'E',
                    templateUrl: '/angular-templates/footer.html'
                };
            }
        ]);
})();