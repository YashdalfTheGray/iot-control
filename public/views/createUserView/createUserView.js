/* global angular */

angular.module('iotControl')
.controller('CreateUserViewCtrl',
    [
        '$state', '$firebaseObject', 'server', 'toastSvc',
        function($state, $firebaseObject, server, toastSvc) {
            "use strict";

            var vm = this;
            var SHA512 = new Hashes.SHA512();
            var ref = new Firebase(server.uri);

            vm.signup = function() {
                ref.createUser({
                    email: vm.email,
                    password: SHA512.hex(vm.password)
                },
                function(error, userData) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        toastSvc.show('User successfully created. Please log in!');
                        $state.go('home');
                    }
                });
            };
        }
    ]
);