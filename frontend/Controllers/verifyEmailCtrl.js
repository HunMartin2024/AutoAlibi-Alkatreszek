app.controller('verifyEmailCtrl', function($scope, $rootScope, $location, $timeout){
    const token = $location.search().token;
    
    axios.post(`${$rootScope.backendURL}/verifyEmail`, {
        token: token
    }).then(res => {
        $timeout(()=>{
            $location.path('/')
        },3000)
        $scope.$apply();
    }).catch(err =>{
        $location.search('token', null)
        $location.path('/')
        $scope.$apply();
    });
})