/* global angular */

angular.module('iotControl')
.controller('LoginUserViewCtrl', 
    [
        '$state', '$mdToast', 'userSvc',
        function($state, $mdToast, userSvc) {
            "use strict";

            var vm = this;

            vm.login = function() {
                var SHA512 = new Hashes.SHA512();
                
                userSvc.loginUser(vm.email, SHA512.hex(vm.password))
                .then(
                    function(result) {
                        console.log(result);
                        $state.go('home');
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