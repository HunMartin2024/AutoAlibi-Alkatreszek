app.controller('newPassCtrl', function($scope, $rootScope, $location){
    $scope.passwords = {}
    $scope.messages = []
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
