/* global angular */

angular.module('iotControl')
.factory('accessTokenSvc',
    [
        '$rootScope', '$q', '$state', '$mdMedia', '$mdDialog', 'userSvc',
        function($rootScope, $q, $state, $mdMedia, $mdDialog, userSvc) {
            "use strict";

            var svc = this;

            $rootScope.tokenList = [];

            function AddTokensDialogCtrl($mdDialog, userSvc) {
                var vm = this;

                vm.hide = function() {
                    $mdDialog.hide();
                };

                vm.saveTokens = function() {
                    $mdDialog.hide({
                        particle: vm.particleToken
                    });
                };

                vm.login = function() {
                    userSvc.showLogin(vm.fromState);
                    $mdDialog.hide();
                };
            }

            svc.addToken = function(service, token) {
                if (service && token) {
                    $rootScope.tokenList.push({ service: service, token: token });
                }
            };

            svc.removeToken = function(service) {
                _.remove($rootScope.tokenList, function(i) {
                    return i.service === service;
                });
            };

            svc.getToken = function(service) {
                return _.result(_.find($rootScope.tokenList, function(i) {
                    return i.service === service;
                }), 'token');
            };

            svc.count = function() {
                return $rootScope.tokenList.length;
            };

            svc.trashTokens = function() {
                $rootScope.tokenList = [];
            }

            svc.askForTokens = function(fromState, serviceName) {
                var tokensToAskFor = serviceName || 'all';
                var def = $q.defer();

                if ($mdMedia('gt-md')) {
                    $mdDialog.show({
                        controller: AddTokensDialogCtrl,
                        controllerAs: 'ctrl',
                        templateUrl: 'views/addTokensView/addTokensDialog.tpl.html',
                        parent: angular.element(document.body),
                        locals: {
                            askFor: tokensToAskFor,
                            fromState: fromState
                        },
                        bindToController: true
                    })
                    .then(
                        function(result) {
                            for (var prop in result) {
                                if (result.hasOwnProperty(prop)) {
                                    svc.addToken(prop, result[prop]);
                                }
                            }
                            def.resolve();
                        },
                        function(error) {
                            def.reject(error);
                        }
                    );
                }
                else {
                    $state.go('add-token', { returnView: fromState, askFor: tokensToAskFor });
                    def.resolve();
                }

                return def.promise;
            };

            return {
                addToken: svc.addToken,
                removeToken: svc.removeToken,
                getToken: svc.getToken,
                count: svc.count,
                trashTokens: svc.trashTokens,
                askForTokens: svc.askForTokens
            };
        }
    ]
);