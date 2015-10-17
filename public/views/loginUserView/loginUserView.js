/* global angular */

angular.module('iotControl')
.controller('LoginUserViewCtrl', 
    [
        '$state', '$mdToast', 'server', 'toast',
        function($state, $mdToast, server, toast) {
            "use strict";

            var vm = this;
            var ref = new Firebase('https://iot-control.firebaseio.com');

            vm.login = function() {
                var SHA512 = new Hashes.SHA512();
                
                ref.authWithPassword({
                    email: vm.email,
                    password: SHA512.hex(vm.password)
                },
                function(error, authData) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        $mdToast.show(
                            $mdToast.simple()
                            .content('User login successful!')
                            .position(toast.position)
                            .hideDelay(toast.durationLong)
                        );
                        console.log(authData);
                    }
                });
            };

            vm.signup = function() {
                $state.go('createuser');
            };
        }
    ]
);