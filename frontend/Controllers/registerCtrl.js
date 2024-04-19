app.controller('registerCtrl', function($scope, $rootScope, $location, $timeout){
    $scope.reguser={};
    $scope.messages = [];
    $scope.register = async function(){
        $scope.messages = [];
        try {
            const result = await axios.post(`${$rootScope.backendURL}/register`, $scope.reguser);
            $scope.messages.push(result.data.msg)
        } catch (error) {
            $scope.messages.push(error.response.data?.msg)
        }
        if($scope.messages[0].type == "success"){   
            $timeout(()=>{
                $location.path('/');
            },3000)
        }
        $scope.$apply()
    }
})