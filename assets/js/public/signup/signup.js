(function() {
    'use strict';

    function SignUpController(signUpFactory) {
        this.submitSignUpForm = signUpFactory.submitSignUpForm;
        this.signUpForm = {
            loading: false
        };
    }

    SignUpController.$inject = ['signUpFactory'];

    var app = angular.module('signup', ['toastr', 'compareTo'])
        .directive('signupdata', [

            function() {
                return {
                    bindToController: true,
                    controller: SignUpController,
                    controllerAs: 'app'
                };
            }
        ])
        .factory('signUpFactory', [

            function() {

                function submitSignUpForm(scope) {
                    scope.signUpForm.loading = true;
                    console.log('Clicked');
                }

                return {
                    submitSignUpForm: submitSignUpForm
                };
            }
        ]);
})();