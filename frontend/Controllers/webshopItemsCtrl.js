app.controller('webshopItemsCtrl', function($scope, $rootScope, $location){
    $scope.itemsxd = [
    {
        nev: "szűrőnév",
        tipus: "Audi A4 B5 1997",
        forma: "kerek",
        hossz: "242mm",
        szelesseg: "211mm",
        magassag: "57mm",
    },
    {
        nev: "szűrőnév",
        tipus: "Audi A4 B5 1997",
        forma: "kerek",
        hossz: "242mm",
        szelesseg: "211mm",
        magassag: "57mm"
    },
    {
        nev: "szűrőnév",
        tipus: "Audi A4 B5 1997",
        forma: "kerek",
        hossz: "242mm",
        szelesseg: "211mm",
        magassag: "57mm"
    }];
    $scope.items = [];
    axios.get(`${$rootScope.backendURL}/webshopItems?type=${$location.search().type}`).then(res =>{
        const data = res.data;
        data.forEach(item => {
            $scope.items.push( {
                nev: item.nev,
                tipus: item.tipus,
                adatok: item.adatok.split(';'),
                kep: item.kep,
                ar: 0
            })
        });
        $scope.$apply();
    })
});