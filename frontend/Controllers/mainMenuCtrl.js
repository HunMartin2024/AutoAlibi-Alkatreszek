app.controller('mainMenuCtrl', function($scope, $rootScope, $location){
    $scope.rendelesek = [];
    axios.get(`${$rootScope.backendURL}/orders/${$rootScope.user.id}`) .then(res =>{
        $scope.rendelesek = res.data;
        $scope.$apply();
    })
});