/* global angular */

angular.module('iotControl')
.factory('particleSvc',
    [
        'accessTokenSvc',
        function(accessTokenSvc) {
            "use strict";

            var apiUri = 'https://api.particle.io/v1/';
            
            return {

            };
        }
    ]
);