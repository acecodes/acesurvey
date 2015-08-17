(function() {

    'use strict';

    function HomepageController(homepageFactory) {
        this.loginForm = {
            loading: false
        };

        this.submitLoginForm = homepageFactory.submitLoginForm;
    }

    HomepageController.$inject = ['homepageFactory'];


    var app = angular.module('homepage', ['toastr', 'compareTo'])
        .directive('homepagedata', [

            function() {
                return {
                    bindToController: true,
                    controller: HomepageController,
                    controllerAs: 'app'
                };
            }
        ])
        .factory('homepageFactory', ['$http', 'toastr',
            function($http, toastr) {
                function submitLoginForm(scope) {

                    scope.loginForm.loading = true;

                    $http.put('/login', {
                        email: scope.loginForm.email,
                        password: scope.loginForm.password
                    })
                        .then(function onSuccess() {

                            /*
                            Future improvement: use ui-router or something similar 
                            to make this a true SPA instead of using window
                            */
                            
                            window.location = '/';
                        })
                        .catch(function onError(sailsResponse) {

                            // Handle known error type(s).
                            // Invalid username / password combination.
                            if (sailsResponse.status === 400 || 404) {
                                toastr.error('Invalid email/password combination.', 'Error', {
                                    closeButton: true
                                });
                                return;
                            }

                            toastr.error('An unexpected error occurred, please try again.', 'Error', {
                                closeButton: true
                            });
                            return;

                        })
                        .finally(function eitherWay() {
                            scope.loginForm.loading = false;
                        });
                }

                return {
                    submitLoginForm: submitLoginForm
                };
            }
        ]);
})();