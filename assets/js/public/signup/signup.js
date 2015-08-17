(function() {
        'use strict';

        function SignupController(signupFactory) {
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

                        /*
                        Sign up for a new account.
                        */

                        scope.signupForm.loading = true;

                        /*
                        Future improvement: use password machinepack
                        to encrypt passwords. Note: I would NEVER
                        use plaintext passwords in a production application.
                        */

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
                        submitSignupForm: submitSignupForm,
                        submitLoginForm: submitLoginForm
                    };
                }
            ]);
})();