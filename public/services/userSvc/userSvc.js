/* global angular */

angular.module('iotControl')
.factory('userSvc',
    [
        '$rootScope', '$q', '$state', '$firebaseAuth', '$mdDialog', '$mdMedia', 'toastSvc', 'server',
        function($rootScope, $q, $state, $firebaseAuth, $mdDialog, $mdMedia, toastSvc, server) {
            "use strict";

            var svc = this;
            var ref = new Firebase(server.uri);
            var authObj = $firebaseAuth(ref);

            $rootScope.account = {};

            function LoginUserDialogCtrl($state, $mdDialog, toastSvc, userSvc) {
                var vm = this;

                vm.hide = function() {
                    $mdDialog.hide();
                }

                vm.login = function() {
                    var SHA512 = new Hashes.SHA512();
                    
                    userSvc.loginUser(vm.email, SHA512.hex(vm.password))
                    .then(
                        function(result) {
                            if (result.firstName === 'New User') {
                                $state.go('dashboard');
                            }
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

                vm.resetPassword = function() {
                if (!vm.email) {
                    toastSvc.show('Please enter an email to reset your password.');
                }
                else {
                    userSvc.resetPassword(vm.email).then(function() {
                        toastSvc.show('Password reset email sent successfully!');
                    }).catch(function(error) {
                        console.log(error);
                    });
                }
            }
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
                    $rootScope.account.firstName = 'New User';
                }
                return $rootScope.account[propName];
            };

            svc.set = function(propName, value) {
                $rootScope.account[propName] = value;
            }

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

                authObj.$authWithPassword(
                    {
                        email: email,
                        password: hashPassword
                    },
                    { remember: 'sessionOnly' }
                ).then(
                    function(authData) {
                        toastSvc.show('User login successful!');
                        $rootScope.account.loggedIn = true;
                        $rootScope.account.uid = authData.uid;
                        $rootScope.account.token = authData.token;
                        $rootScope.account.email = authData.password.email;
                        $rootScope.account._authData = authData;
                        def.resolve($rootScope.account);
                    },
                    function(error) {
                        def.reject(error);
                    }
                );

                return def.promise;
            }

            svc.logoutUser = function() {
                $rootScope.account = {};
                authObj.$unauth();
                $state.go('home');
            };

            svc.resetPassword = function(email) {
                return authObj.$resetPassword({ email: email });
            };

            return {
                isLoggedIn: svc.isLoggedIn,
                get: svc.get,
                set: svc.set,
                showLogin: svc.showLogin,
                loginUser: svc.loginUser,
                logoutUser: svc.logoutUser,
                resetPassword: svc.resetPassword
            };
        }
    ]
);