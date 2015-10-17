/* global angular */

angular.module('iotControl')
.controller('CreateUserViewCtrl',
    [
        '$state', '$mdToast', '$firebaseObject', 'server', 'toast',
        function($state, $mdToast, $firebaseObject, server, toast) {
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
                        $mdToast.show(
                            $mdToast.simple()
                            .content('User successfully created. Please log in!')
                            .position(toast.position)
                            .hideDelay(toast.durationLong)
                        );
                        /*var userRef = new Firebase(server.uri + '/users/' + userData.uid);
                        var userObj = $firebaseObject(userRef);
                        userObj.firstName = vm.firstName;
                        userObj.lastName = vm.lastName;
                        userObj.tokens = vm.tokens;
                        userObj.$save().then(function(ref) {
                            console.log(ref);
                        },
                        function(error) {
                            console.log(error);
                        });*/

                        $state.go('home');
                    }
                });
            };
        }
    ]
);