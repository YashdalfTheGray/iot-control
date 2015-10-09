/* global angular */

angular.module('iotControl')
.factory('accessTokenSvc',
    [
        '$rootScope',
        function($rootScope) {
            "use strict";

            $rootScope.tokenList = [];

            this.addToken = function(service, token) {
                if (service && token) {
                    $rootScope.tokenList.push({ service: service, token: token });
                }
            };

            this.removeToken = function(service) {
                _.remove($rootScope.tokenList, function(i) {
                    return i.service === service;
                });
            };

            this.getToken = function(service) {
                return _.result(_.find($rootScope.tokenList, function(i) {
                    return i.service === service;
                }), 'token');
            };

            this.count = function() {
                return $rootScope.tokenList.length;
            }

            return {
                addToken: this.addToken,
                removeToken: this.removeToken,
                getToken: this.getToken,
                count: this.count
            };
        }
    ]
);