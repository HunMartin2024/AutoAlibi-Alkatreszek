app.controller('forgetPassCtrl', function($scope, $rootScope, $location){
    $scope.email ="";
    $scope.messages = [];
    $scope.sendEmail = async function(){
        $scope.messages = []
        try {
            const result = await axios.post(`${$rootScope.backendURL}/forgetPass`, {
                email: $scope.email
            });
            $scope.messages.push(result.data.msg)
        } catch (error) {
            $scope.messages.push(error.response.data?.msg)
        }
        $scope.$apply();
    }
})