/* global angular */

angular.module('iotControl')
.factory('UserSvc',
    [
        '$state', 'accessTokenSvc',
        function($state, accessTokenSvc) {
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