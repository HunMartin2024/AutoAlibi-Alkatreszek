app.controller('loginCtrl', function($scope, $rootScope){
    $scope.loguser = {};
    $scope.passVisible = "password";
    $scope.icon = "fa-eye";
    $scope.passToggle =  function(){
        if($scope.passVisible == "password")
        {
            $scope.passVisible = "text"
            $scope.icon = "fa-eye-slash";
        }
        else{
            $scope.passVisible = "password"
            $scope.icon = "fa-eye";
        }
    }
    $scope.login = async function(){
        try {
            const result = await axios.post(`${$rootScope.backendURL}/login`, $scope.loguser);
            console.log(result);
        } catch (error) {
            
        }
    }
})