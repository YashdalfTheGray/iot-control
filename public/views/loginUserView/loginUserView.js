/* global angular */

angular.module('iotControl')
.controller('LoginUserViewCtrl', 
    [
        '$state', 'server',
        function($state, server) {
            "use strict";

            var vm = this;

            vm.login = function() {

            };

            vm.signup = function() {
                $state.go('createuser');
            };
        }
    ]
);