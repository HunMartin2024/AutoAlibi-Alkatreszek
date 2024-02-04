var app = angular.module('AutoAlibi', ['ngRoute']);

app.run(function($rootScope){
    $rootScope.appTitle = 'AutoAlibi Alkatreszek';
});

app.config(function($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl: 'Views/login.html'
    })
    .when('/register', {
        templateUrl: 'Views/register.html'
    })
    .when('/newPass', {
        templateUrl: 'Views/newPassword.html'
    })
    // <-- ADMIN ROUTES 
    .otherwise(
        {redirectTo: '/'}
    )
});
