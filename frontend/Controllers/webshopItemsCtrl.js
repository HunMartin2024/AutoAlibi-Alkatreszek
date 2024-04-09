app.controller('webshopItemsCtrl', function($scope, $rootScope, $location){
    $scope.items = [];
    $scope.mennyiseg = [];
    $scope.search = "";

    // keresés késleltetése, hogy ne karakterenként fusson le a backend hívás
    const debounced = _.debounce(function() {
        $scope.items = [];
        getData();
    }, 200);

    const getData = () => {
        axios.get(`${$rootScope.backendURL}/webshopItems?type=${$location.search().type}${$scope.search != "" ? `&search=` + $scope.search : ''}`).then(res =>{
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
    }

    $scope.kereses = () => {
        debounced();
    }

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

    getData();
});