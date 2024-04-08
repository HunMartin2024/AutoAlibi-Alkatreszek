var app = angular.module('AutoAlibi', ['ngRoute']);

app.run(function($rootScope, $location){
    $rootScope.appTitle = 'AutoAlibi Alkatreszek';
    $rootScope.backendURL = 'http://localhost:3002';
    $rootScope.user = {};
    $rootScope.kosar = JSON.parse(localStorage.getItem("kosar")) || {}

    if(sessionStorage.getItem("user")){
        $rootScope.user = JSON.parse(sessionStorage.getItem("user"));
    }

    $rootScope.logOut = function(){
        sessionStorage.removeItem("user");
        $rootScope.user = {};
        $location.path('/');
    };
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
        controller: 'mainMenuCtrl',
        resolve: {
            function($rootScope, $location) {
                if(!$rootScope.user.email){
                    $location.path('/')
                }
            }
        }
    })
    .when('/mainMenu/contact', {
        templateUrl: 'Views/contact.html',
        controller: 'contactCtrl',
        resolve: {
            function($rootScope, $location) {
                if(!$rootScope.user.email){
                    $location.path('/')
                }
            }
        }
    })
    .when('/mainMenu/webshop', {
        templateUrl: 'Views/webshop.html',
        resolve: {
            function($rootScope, $location) {
                if(!$rootScope.user.email){
                    $location.path('/')
                }
            }
        }
    })
    .when('/mainMenu/webshopItems', {
        templateUrl: 'Views/webshopItems.html',
        controller: 'webshopItemsCtrl',
        resolve: {
            function($rootScope, $location) {
                if(!$rootScope.user.email){
                    $location.path('/')
                }
            }
        }
    })
    .when('/mainMenu/webshopCart', {
        templateUrl: 'Views/webshopCart.html',
        controller: 'webshopCartCtrl',
        resolve: {
            function($rootScope, $location) {
                if(!$rootScope.user.email){
                    $location.path('/')
                }
            }
        }
    })
    .when('/mainMenu/userData', {
        templateUrl: 'Views/userData.html',
        controller: 'userDataCtrl',
        resolve: {
            function($rootScope, $location) {
                if(!$rootScope.user.email){
                    $location.path('/')
                }
            }
        }
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
