/* global angular */

angular.module('iotControl')
.factory('accessTokenSvc',
    [
        function() {
            "use strict";

            var tokenList = [];

            this.addToken = function(service, token) {
                if (service && token) {
                    tokenList.push({ service: service, token: token });
                }
            };

            this.removeToken = function(service) {
                _.remove(tokenList, function(i) {
                    return i.service === service;
                });
            };

            this.getToken = function(service) {
                _.result(_.find(tokenList, function(i) {
                    return i.service === service;
                }), 'token');
            };

            return {
                addToken: this.addToken,
                removeToken: this.removeToken,
                getToken: this.getToken,
                count: tokenList.length
            };
        }
    ]
);