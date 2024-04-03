app.controller('webshopCartCtrl', function($scope, $rootScope, $location){
    $scope.items = [];
    $scope.message = "";
    $scope.osszeg = 0;
    let kosar = localStorage.getItem("kosar")
    if(!kosar){
        $scope.message = "Kosár üres!"
    }
    else{
        let parsed = JSON.parse(kosar)
        console.log(parsed)
        axios.post(`${$rootScope.backendURL}/webshopCart`, parsed).then(res =>{
            const data = res.data;
            data.forEach(item => {
                $scope.osszeg += parseInt(item.Ar) * $rootScope.kosar[item.id].count;
                $scope.items.push( {
                    nev: item.nev,
                    kep: item.kep,
                    mennyiseg: $rootScope.kosar[item.id].count,
                    ar: item.Ar,
                })
            });
            $scope.$apply();
        })
    }
})