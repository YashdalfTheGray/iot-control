/* global angular */

angular.module('iotControl')
.controller('LoginUserViewCtrl', 
    [
        '$state', 'server',
        function($state, server) {
            "use strict";

            var vm = this;

            vm.login = function() {
                var SHA512 = new Hashes.SHA512();
                console.log(SHA512.hex(vm.password));
            };

            vm.signup = function() {
                $state.go('createuser');
            };
        }
    ]
);