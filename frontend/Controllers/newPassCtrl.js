app.controller('newPassCtrl', function($scope, $rootScope, $location){
    $scope.passwords = {}
    $scope.messages = []
    $scope.passVisible = ["password", "password"];
    $scope.icon = ["fa-eye", "fa-eye"];
    $scope.passToggle =  function(index){
        if($scope.passVisible[index] == "password")
        {
            $scope.passVisible[index] = "text"
            $scope.icon[index] = "fa-eye-slash";
        }
        else{
            $scope.passVisible[index] = "password"
            $scope.icon[index]  = "fa-eye";
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
