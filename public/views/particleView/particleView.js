angular.module('iotControl')
.controller('ParticleViewCtrl',
    [
        '$state', 'particleSvc', 'clearInputSvc', 'toastSvc',
        function($state, particleSvc, clearInputSvc, toastSvc) {
            "use strict";

            var vm = this;
            vm.devices = [];

            function getParticleDevices() {
                particleSvc.getDevices().then(
                    function(result) {
                        _.forEach(result.data, function(device) {
                            particleSvc.getDeviceDetails(device.id).then(
                                function(result) {
                                    vm.devices.push(result.data);
                                },
                                function(error) {
                                    console.log(device.id + ' failed!');
                                    console.log(error);
                                }
                            )
                        });
                    },
                    function(error) {
                        console.log('Failed!');
                        console.log(error);
                    }
                );
            }

            if(!particleSvc.hasToken()) {
                particleSvc.askForToken().then(
                    function() {
                        getParticleDevices();
                    },
                    function(error) {
                        console.log(error);
                    }
                );
            }
            else {
                getParticleDevices();
            }

            vm.callFunction = function(deviceId, func, arg, idToClear) {
                particleSvc.callFunction(deviceId, func, arg).then(
                    function(result) {
                        toastSvc.show('Function ' + func + ' executed successfully!');
                    },
                    function(error) {
                        console.log('Function ' + func + ' Failed!');
                        console.log(error);
                    }
                );
                clearInputSvc.clearInputBox(idToClear);
            }
        }
    ]
);