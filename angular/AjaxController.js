var iotClient = angular.module('iotClient',[]);

iotClient.controller('AjaxController', ['$scope', '$http', function($scope, $http)
{
    $http.get('/conf/connections.json')
    .success(function(data)
    {
        console.log('SUCCESS');
        $scope.fileConf = data;
        $scope.carteList = $scope.fileConf.configurationServer;
    })
    .error(function(data, status)
    {
        console.log('ERROR');
        console.log(data);
        console.log(status)
    });


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

    $scope.getThing = function(address, port)
    {
        $scope.conf = {};
        $scope.conf.address = address;
        $scope.conf.port = port;

        $http.get('http://'+address+':'+port+'/thing')
        .success(function(data, status, headers, config)
        {
            console.log('SUCCESS');
            console.log(status)
            console.log(data)
            $scope.thing = data;
        })
        .error(function(data, status, headers, config)
        {
            console.log('ERROR')
            console.log(data);
            console.log(status);
        });
    }


    $scope.putThing = function()
    {
        $http(
            {
                method: 'PUT',
                url: 'http://'+$scope.conf.address+':'+$scope.conf.port+'/thing',
                headers:
                {
                    'Content-Type': 'application/json'
                },
                data:
                {
                    "thing" : this.thing
                }
            }
        )
        .success(function(data, status, headers, config)
        {
            console.log('SUCCESS');
            console.log(data);
            console.log(status);
        })
        .error(function(data, status, headers, config)
        {
            console.log('ERROR')
            console.log(data);
            console.log(status);
        });
    };
}]);