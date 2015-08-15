(function() {
    'use strict';

    function GlobalController() {
        // Nothing here for now.
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