/* global angular */

angular.module('iotControl')
.factory('userSvc',
    [
        '$rootScope', '$q', '$state', '$mdDialog', '$mdMedia',
        function($rootScope, $q, $state, $mdDialog, $mdMedia) {
            "use strict";

            var svc = this;

            function LoginUserDialogCtrl($state, $mdDialog) {
                var vm = this;

                vm.hide = function() {
                    $mdDialog.hide();
                }

                vm.login = function() {
                    var SHA512 = new Hashes.SHA512();
                    console.log(SHA512.hex(vm.password));
                };

                vm.signup = function() {
                    $state.go('createuser');
                    $mdDialog.hide();
                };
            }

            svc.isLoggedIn = function() {
                return false;
            };

            svc.get = function(propName) {
                return "Testerson";
            };

            svc.loginUser = function(fromState) {
                var def = $q.defer();

                if ($mdMedia('gt-md')) {
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

            return {
                isLoggedIn: svc.isLoggedIn,
                get: svc.get,
                loginUser: svc.loginUser
            };
        }
    ]
);