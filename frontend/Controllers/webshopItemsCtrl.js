app.controller('webshopItemsCtrl', function($scope, $rootScope, $location){
    $scope.items = [];
    $scope.mennyiseg = [];
    axios.get(`${$rootScope.backendURL}/webshopItems?type=${$location.search().type}`).then(res =>{
        const data = res.data;
        data.forEach(item => {
            $scope.items.push( {
                nev: item.nev,
                tipus: item.tipus,
                adatok: item.adatok.split(';'),
                kep: item.kep,
                ar: item.Ar,
                id: item.id
            })
        });
        $scope.$apply();
    })
    $scope.hozzaadas = function(itemID, mennyiseg){
        if(!mennyiseg || mennyiseg ==0){
            return alert("Hibás mennyiség!")
        }
        if(!$rootScope.kosar[itemID]){
            $rootScope.kosar[itemID] = {count:0}
        }
        $rootScope.kosar[itemID].count+=mennyiseg;
        localStorage.setItem("kosar", JSON.stringify($rootScope.kosar))
        alert("Elem kosárba helyezve!")
    }
});