/* global angular */
/* global _ */

angular.module('iotControl', 
    [
        'ui.router',
        'ngAnimate',
        'ngMaterial',
        'firebase'
    ]
)
.config([
    '$urlRouterProvider', '$stateProvider', '$mdThemingProvider',
    function($urlRouterProvider, $stateProvider, $mdThemingProvider) {
        "use strict";

        $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'views/homeView/homeView.tpl.html',
            controller: 'HomeViewCtrl as ctrl'
        })
        .state('add-token', {
            url: '/addtoken?returnView&askFor',
            templateUrl: 'views/addTokensView/addTokensView.tpl.html',
            controller: 'AddTokensViewCtrl as ctrl'
        })
        .state('createuser', {
            url: '/createuser',
            templateUrl: 'views/createUserView/createUserView.tpl.html',
            controller: 'CreateUserViewCtrl as ctrl'
        })
        .state('login', {
            url: '/login?returnView',
            templateUrl: 'views/loginUserView/loginUserView.tpl.html',
            controller: 'LoginUserViewCtrl as ctrl'
        })
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'views/dashboardView/dashboardView.tpl.html',
            controller: 'DashboardViewCtrl as ctrl'
        })
        .state('particle-view', {
            url: '/particle',
            templateUrl: 'views/particleView/particleView.tpl.html',
            controller: 'ParticleViewCtrl as ctrl'
        });
        $urlRouterProvider.otherwise('/');

        $mdThemingProvider.theme('default')
            .primaryPalette('green')
            .accentPalette('blue',{
                'default': 'A400',
                'hue-1': 'A700'
            })
            .warnPalette('red');
    }
])
.constant('server', {
    uri: 'https://iot-control.firebaseio.com'
})
.constant('toast', {
    position: 'top right',
    durationShort: 1000,
    durationLong: 3000
});