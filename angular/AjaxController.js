var myApp = angular.module('myApp',[]);

myApp.controller('AjaxController', ['$scope', '$http', function($scope, $http)
{
    $scope.carteList = conf.configurationServer;

    // $scope.gpios = jstores.gpios;

    // $http({method: 'POST', url: '/conf/aaa.json'})
    //     .success(function(data){
    //         console.log(data);
    // });

    $scope.templates = 
    [
        {
            name: 'carteInfos.html',
            url: '/angular/templates/carteInfos.html'
        },
        {
            name: 'template2.html',
            url: 'templates/template2.html'
        }
    ];
    $scope.template = $scope.templates[0];


    // $scope.loadCarte = function()
    // {
    //     alert('CLICKUZ')
    //     $scope.template = $scope.templates[1];
    //     console.log($scope.template)
    // }
    $scope.getGpios = function(address, port)
    {
        $scope.conf = {};
        $scope.conf.address = address;
        $scope.conf.port = port;

        // $http.get('http://'+address+':'+port+'/').
        $http.get('http://'+address+':'+port+'/thing/gpios').
        success(function(data, status, headers, config)
        {
            console.log('SUCCESS');
            data = JSON.parse(data);
            console.log(data)

            $scope.selectedCarte = data;
            
            console.log($scope.selectedCarte)
            // $scope.selectedCarte = data.gpios;
            // console.log(status)
            $scope.template = $scope.templates[0];
        }).
        error(function(data, status, headers, config)
        {
            console.log('ERROR');
        });
    };

    $scope.postGpios = function(data)
    {
        $http.post('http://'+$scope.conf.address+':'+$scope.conf.port+'/thing/gpios', data).
        success(function(data, status, headers, config)
        {
            console.log('SUCCESS');
            console.log(data);
            console.log(status);
        }).
        error(function(data, status, headers, config)
        {
            console.log('ERROR')
            console.log(data);
            console.log(status);
        });
    };
}]);