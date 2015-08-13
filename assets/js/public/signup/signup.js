(function() {
    'use strict';

    function SignUpController(signUpFactory) {
        this.submitSignUpForm = signUpFactory.submitSignUpForm;
        this.signUpForm = {
            loading: false
        };
    }

    SignUpController.$inject = ['signUpFactory'];

    var app = angular.module('signup', ['toastr', 'compareTo', 'restangular'])
        .directive('signupdata', [

            function() {
                return {
                    bindToController: true,
                    controller: SignUpController,
                    controllerAs: 'app'
                };
            }
        ])
        .factory('signUpFactory', ['Restangular',

            function(Restangular) {

                var APIURL = 'http://localhost:1337/';
                var API = Restangular.setBaseUrl(APIURL);

                function submitSignUpForm(scope, name, title, email, password, admin) {
                    scope.signUpForm.loading = true;
                    var signUpEndPoint = Restangular.all('signup/');

                    signUpEndPoint.post({
                        'name': name,
                        'title': title,
                        'email': email,
                        'password': password,
                        'admin': admin
                    }).then(function(success) {
                            console.log(success);
                        },
                        function(err) {
                            console.log('Didn\'t work. Error: ', err);
                        });
                }

                return {
                    submitSignUpForm: submitSignUpForm
                };
            }
        ]);
})();