var app = angular.module('AutoAlibi', ['ngRoute']);

app.run(function($rootScope){
    $rootScope.appTitle = 'AutoAlibi Alkatreszek';
    $rootScope.backendURL = 'http://localhost:3002';
    $rootScope.user = {};
});

app.config(function($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl: 'Views/login.html',
        controller: 'loginCtrl'
    })
    .when('/register', {
        templateUrl: 'Views/register.html',
        controller: 'registerCtrl'
    })
    .when('/newPass', {
        templateUrl: 'Views/newPassword.html'
    })
    .when('/mainMenu', {
        templateUrl: 'Views/mainMenu.html',
        controller: 'mainMenuCtrl'
    })
    .when('/contact', {
        templateUrl: 'Views/contact.html',
        controller: 'contactCtrl'
    })
    // <-- ADMIN ROUTES 
    .otherwise(
        {redirectTo: '/'}
    )
});
