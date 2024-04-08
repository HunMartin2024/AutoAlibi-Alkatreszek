app.controller('userDataCtrl', function($scope, $rootScope, $location){
    $scope.payment = "";
    $scope.szallitasi = {};
    $scope.szamlazasi = {};
    $scope.same = false;

    $scope.megrendeles = function(){
        if($scope.same){
            $scope.szallitasi = $scope.szamlazasi;
        }
        axios.post(`${$rootScope.backendURL}/order`, {
            szallitasi: $scope.szallitasi,
            szamlazasi: $scope.szamlazasi,
            kosar: $rootScope.kosar,
            fizetesimod: $scope.payment
        });
    }
});