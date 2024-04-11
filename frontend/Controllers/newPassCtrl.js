app.controller('newPassCtrl', function($scope, $rootScope, $location){
    $scope.passwords = {}
    $scope.messages = []
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
    $scope.changePwd = async function(){
        $scope.messages = []
        try {
            const result = await axios.post(`${$rootScope.backendURL}/newPass?token=${$location.search().token}`, $scope.passwords);
            $scope.messages.push(result.data.msg)
        } catch (error) {
            $scope.messages.push(error.response.data?.msg)
        }
        $scope.$apply();
    }
})
