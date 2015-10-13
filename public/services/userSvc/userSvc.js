/* global angular */

angular.module('iotControl')
.factory('userSvc',
    [
        '$rootScope', '$state',
        function($rootScope, $state) {
            "use strict";

            var svc = this;

            svc.loginUser = function(fromState) {
                $state.go('login', { returnView: fromState });
            };

            return {
                loginUser: svc.loginUser
            };
        }
    ]
);