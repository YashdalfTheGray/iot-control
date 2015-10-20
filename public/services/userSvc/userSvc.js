/* global angular */

angular.module('iotControl')
.factory('userSvc',
    [
        '$rootScope', '$q', '$state', '$mdDialog', '$mdMedia', '$mdToast', 'server', 'toast',
        function($rootScope, $q, $state, $mdDialog, $mdMedia, $mdToast, server, toast) {
            "use strict";

            var svc = this;
            var ref = new Firebase(server.uri);

            $rootScope.account = {};

            function LoginUserDialogCtrl($state, $mdDialog, $mdToast, userSvc) {
                var vm = this;

                vm.hide = function() {
                    $mdDialog.hide();
                }

                vm.login = function() {
                    var SHA512 = new Hashes.SHA512();
                    
                    userSvc.loginUser(vm.email, SHA512.hex(vm.password))
                    .then(
                        function(result) {
                            console.log(result);
                            $mdDialog.hide(result);
                        },
                        function(error) {
                            console.log(error);
                        }
                    );
                };

                vm.signup = function() {
                    $state.go('createuser');
                    $mdDialog.hide();
                };
            }

            svc.isLoggedIn = function() {
                if(!$rootScope.account) {
                    return false;
                }
                else {
                    return $rootScope.account.loggedIn;
                }
            };

            svc.get = function(propName) {
                if(propName === 'firstName' && !$rootScope.account.firstName) {
                    return 'New User';
                }
                else {
                    return $rootScope.account[propName];
                }
            };

            svc.showLogin = function(fromState) {
                var def = $q.defer();

                if ($mdMedia('gt-md')) {
                    $state.go(fromState);
                    $mdDialog.show({
                        controller: LoginUserDialogCtrl,
                        controllerAs: 'ctrl',
                        templateUrl: 'views/loginUserView/loginUserDialog.tpl.html',
                        parent: angular.element(document.body),
                        locals: {
                            fromState: fromState
                        },
                        bindToController: true
                    })
                    .then(
                        function(result) {
                            // parse the token object here and store it in $rootScope
                            def.resolve();
                        },
                        function(error) {
                            def.reject(error);
                        }
                    );
                }
                else {
                    $state.go('login', { returnView: fromState });
                    def.resolve();
                }

                return def.promise;
            };

            svc.loginUser = function(email, hashPassword) {
                var def = $q.defer();

                ref.authWithPassword(
                    {
                        email: email,
                        password: hashPassword
                    },
                    function(error, authData) {
                        if (error) {
                            def.reject(error);
                        }
                        else {
                            $mdToast.show(
                                $mdToast.simple()
                                .content('User login successful!')
                                .position(toast.position)
                                .hideDelay(toast.durationLong)
                            );
                            $rootScope.account.loggedIn = true;
                            $rootScope.account.uid = authData.uid;
                            $rootScope.account.token = authData.token;
                            $rootScope.account.authData = authData;

                            def.resolve($rootScope.account);
                        }
                    },
                    { remember: 'sessionOnly' }
                );

                return def.promise;
            }

            svc.logoutUser = function() {
                $rootScope.account = {};
            };

            return {
                isLoggedIn: svc.isLoggedIn,
                get: svc.get,
                showLogin: svc.showLogin,
                loginUser: svc.loginUser,
                logoutUser: svc.logoutUser
            };
        }
    ]
);