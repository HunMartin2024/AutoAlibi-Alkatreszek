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
        templateUrl: 'Views/newPassword.html',
        controller: 'newPassCtrl',
        resolve: {
            function($location) {
                if(!$location.search().token){
                    $location.path('/')
                }
            }
        }
    })
    .when('/mainMenu', {
        templateUrl: 'Views/mainMenu.html',
        controller: 'mainMenuCtrl'
    })
    .when('/contact', {
        templateUrl: 'Views/contact.html',
        controller: 'contactCtrl'
    })
    .when('/forgetPass', {
        templateUrl: 'Views/forgetPass.html',
        controller: 'forgetPassCtrl'
    })
    .when('/verifyEmail', {
        templateUrl: 'Views/verifyEmail.html',
        controller: 'verifyEmailCtrl'
    })
    // <-- ADMIN ROUTES 
    .otherwise(
        {redirectTo: '/'}
    )
});
