/* global angular */

angular.module('iotControl')
.controller('LoginUserViewCtrl', 
    [
        '$state', 'toastSvc', 'userSvc',
        function($state, toastSvc, userSvc) {
            "use strict";

            var vm = this;

            vm.login = function() {
                var SHA512 = new Hashes.SHA512();
                
                userSvc.loginUser(vm.email, SHA512.hex(vm.password))
                .then(
                    function(result) {
                        if (result.firstName === 'New User') {
                            $state.go('dashboard');
                        }
                        else {
                            $state.go('home');
                        }
                    },
                    function(error) {
                        console.log(error);
                    }
                );
            };

            vm.signup = function() {
                $state.go('createuser');
            };
        }
    ]
);