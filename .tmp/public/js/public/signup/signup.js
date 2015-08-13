function SignUpController() {
    // Controller data here
}

SignUpController.$inject = [];

var app = angular.module('signup', ['toastr', 'compareTo'])
    .directive('signupdata', [function () {
        return {
            bindToController: true,
            controller: SignUpController,
            controllerAs: 'signup'
        };
    }]);