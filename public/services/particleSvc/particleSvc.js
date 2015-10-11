/* global angular */

angular.module('iotControl')
.factory('particleSvc',
    [
        '$http', 'accessTokenSvc',
        function($http, accessTokenSvc) {
            "use strict";

            var apiUri = 'https://api.particle.io/v1/';
            var configWithHeader = {
                headers: {
                    Authorization: 'Bearer THIS NEEDS CHANGED'
                }
            };

            this.hasToken = function() {
                return accessTokenSvc.getToken('particle') !== undefined;
            };

            this.askForToken = function() {
                return accessTokenSvc.askForTokens('particle-view', 'particle');
            }

            this.getDevices = function() {
                configWithHeader.headers.Authorization = 'Bearer ' + accessTokenSvc.getToken('particle');
                return $http.get(apiUri + 'devices', configWithHeader);
            };

            this.getDeviceDetails = function(deviceId) {
                configWithHeader.headers.Authorization = 'Bearer ' + accessTokenSvc.getToken('particle');
                return $http.get(apiUri + 'devices/' + deviceId, configWithHeader);
            };

            this.callFunction = function(deviceId, functionName, arg) {
                configWithHeader.headers.Authorization = 'Bearer ' + accessTokenSvc.getToken('particle');
                return $http.post(apiUri + 'devices/' + deviceId + '/' + functionName,
                    { arg: arg },
                    configWithHeader
                );
            };
            
            return {
                hasToken: this.hasToken,
                askForToken: this.askForToken,
                getDevices: this.getDevices,
                getDeviceDetails: this.getDeviceDetails,
                callFunction: this.callFunction
            };
        }
    ]
);