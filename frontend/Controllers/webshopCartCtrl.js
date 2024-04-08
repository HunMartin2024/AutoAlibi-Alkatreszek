app.controller('webshopCartCtrl', function($scope, $rootScope, $route, $location){
    $scope.items = [];
    $scope.message = "";
    $scope.osszeg = 0;
    let kosar = localStorage.getItem("kosar")
    if(!kosar || Object.values(JSON.parse(kosar)).length == 0){
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
                    id: item.id,
                    nev: item.nev,
                    kep: item.kep,
                    mennyiseg: $rootScope.kosar[item.id].count,
                    ar: item.Ar,
                })
            });
            $scope.$apply();
        })
        $scope.torles = function(itemId){
            delete parsed[itemId];
            $rootScope.kosar = parsed
            localStorage.setItem("kosar", JSON.stringify(parsed));
            $route.reload();
        }
        $scope.fizetes = function(){
            $location.path("/mainMenu/userData")
        }
    }
})