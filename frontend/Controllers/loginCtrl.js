app.controller('loginCtrl', function($scope, $rootScope, $timeout, $location){
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
            $scope.messages.push(result.data.msg)
            $rootScope.user = result.data.user;
            sessionStorage.setItem("user", JSON.stringify(result.data.user))
        } catch (error) {
            $scope.messages.push(error.response.data?.msg)
        }
        if($scope.messages[0].type == "success"){   
            $timeout(()=>{
                $location.path('/mainMenu');
            },2000)
        }
        $scope.$apply()
    }
})