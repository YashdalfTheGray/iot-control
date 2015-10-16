/* global angular */

angular.module('iotControl')
.controller('CreateUserViewCtrl',
    [
        '$state', '$mdToast', 'server',
        function($state, $mdToast, server) {
            "use strict";

            var vm = this;
            var SHA512 = new Hashes.SHA512();
            var ref = new Firebase(server.uri);

            vm.signup = function() {
                ref.createUser({
                    email: vm.email,
                    password: SHA512.hex(vm.password),
                    firstName: vm.firstName,
                    lastName: vm.lastName,
                    tokens: vm.tokens
                },
                function(error, userData) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        $mdToast.show(
                            $mdToast.simple()
                            .content('User successfully created. Please log in!')
                            .position('bottom right')
                            .hideDelay(3000)
                        );
                        console.log(userData);
                        $state.go('home');
                    }
                });
            };
        }
    ]
);