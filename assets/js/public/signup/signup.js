(function() {
        'use strict';

        function SignupController(signupFactory) {
            // set-up loading state
            this.signupForm = {
                loading: false
            };

            this.submitSignupForm = signupFactory.submitSignupForm;
            this.submitLoginForm = signupFactory.loginForm;
        }

        SignupController.$inject = ['signupFactory'];

        angular.module('signupapp', ['toastr', 'compareTo'])
            .directive('signupdata', [

                function() {
                    return {
                        bindToController: true,
                        controller: SignupController,
                        controllerAs: 'signupapp'
                    };
                }
            ])
            .factory('signupFactory', ['$http', 'toastr',
                
                function($http, toastr) {

                    function submitSignupForm(scope) {

                        // Set the loading state (i.e. show loading spinner)
                        scope.signupForm.loading = true;

                        // Submit request to Sails.
                        $http.post('/signup', {
                            name: scope.signupForm.name,
                            title: scope.signupForm.title,
                            email: scope.signupForm.email,
                            password: scope.signupForm.password,
                            admin: scope.signupForm.admin
                        })
                            .then(function onSuccess(sailsResponse) {
                                window.location = '/';
                            })
                            .catch(function onError(sailsResponse) {

                                // Handle known error type(s).
                                // If using sails-disk adpater -- Handle Duplicate Key
                                var emailAddressAlreadyInUse = sailsResponse.status === 409;

                                if (emailAddressAlreadyInUse) {
                                    toastr.error('That email address has already been taken, please try again.', 'Error');
                                    return;
                                }

                            })
                            .finally(function eitherWay() {
                                scope.signupForm.loading = false;
                            });
                    }

                    function submitLoginForm(scope) {

                        // Set the loading state (i.e. show loading spinner)
                        scope.loginForm.loading = true;

                        // Submit request to Sails.
                        $http.put('/login', {
                            email: scope.loginForm.email,
                            password: scope.loginForm.password
                        })
                            .then(function onSuccess() {
                                // Refresh the page now that we've been logged in.
                                window.location = '/';
                            })
                            .catch(function onError(sailsResponse) {

                                // Handle known error type(s).
                                // Invalid username / password combination.
                                if (sailsResponse.status === 400 || 404) {
                                    // scope.loginForm.topLevelErrorMessage = 'Invalid email/password combination.';
                                    //
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
                        submitSignupForm: submitSignupForm,
                        submitLoginForm: submitLoginForm
                    };
                }
            ]);
})();