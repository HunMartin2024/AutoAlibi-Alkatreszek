app.controller('userDataCtrl', function($scope, $rootScope, $location){
    $scope.payment = "";
    $scope.szallitasi = {};
    $scope.szamlazasi = {};
    $scope.same = false;

    $scope.sameChange = function() {
        if($scope.same){
            $scope.szallitasi = $scope.szamlazasi;
        }
    }

    $scope.megrendeles = function(){
        if($scope.same){
            $scope.szallitasi = $scope.szamlazasi;
        }
        axios.post(`${$rootScope.backendURL}/order`, {
            userid: $rootScope.user.id,
            szallitasi: $scope.szallitasi,
            szamlazasi: $scope.szamlazasi,
            kosar: $rootScope.kosar,
            fizetesimod: $scope.payment
        }).then(res => {
            if (res.status == 200) {
                $rootScope.kosar = {};
                localStorage.setItem("kosar", JSON.stringify($rootScope.kosar));
                $location.path('/mainMenu')
                $scope.$apply()
            }
        });
    }
});