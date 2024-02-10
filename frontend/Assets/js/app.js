var app = angular.module('AutoAlibi', ['ngRoute']);

app.run(function($rootScope){
    $rootScope.appTitle = 'AutoAlibi Alkatreszek';
    $rootScope.backendURL = 'http://localhost:3002';
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
    // <-- ADMIN ROUTES 
    .otherwise(
        {redirectTo: '/'}
    )
});
