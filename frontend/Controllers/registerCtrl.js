app.controller('registerCtrl', function($scope, $rootScope){
    $scope.reguser={};
    $scope.register = async function(){
        try {
            const result = await axios.post(`${$rootScope.backendURL}/register`, $scope.reguser);
            console.log(result);
        } catch (error) {
            
        }
    }
})