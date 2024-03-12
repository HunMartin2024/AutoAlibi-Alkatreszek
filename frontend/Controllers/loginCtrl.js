app.controller('loginCtrl', function($scope, $rootScope){
    $scope.messages = [];
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
        $scope.messages = [];
        try {
            const result = await axios.post(`${$rootScope.backendURL}/login`, $scope.loguser);
            console.log(result);
            $scope.messages.push(result.data.msg)
        } catch (error) {
            $scope.messages.push(error.response.data?.msg)
        }
        $scope.$apply()
    }
})