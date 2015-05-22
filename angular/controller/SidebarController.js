iotClient.controller('SidebarController', ['$scope', '$http', '$filter', '$rootScope', 'Thing', function($scope, $http, $filter, $rootScope, Thing)
{
    $scope. thing = []
    $http.get('../../conf/connections.json')
    .success(function(data)
    {
        console.log('SUCCESS');

        $scope.fileConf = data;

        $scope.fileConf.configurationServer;
        // console.log($scope.fileConf.configurationServer)
    })
    .error(function(data, status)
    {
        console.log('ERROR');
        console.log(data);
        console.log(status)
    })
    .then(function(a, b){
                // console.log($scope.fileConf.configurationServer)

    // $scope.cartesList = [$scope.fileConf.configurationServer[0]];
    // console.log($scope.cartesList)
    // $scope.fileConf.configurationServer[0].connection
    Thing.getThing($scope.fileConf.configurationServer[0].connection.address, $scope.fileConf.configurationServer[0].connection.port, function(data){
        data.connection = $scope.fileConf.configurationServer[0].connection
        $scope.thing.push(data);
        console.log($scope.thing)
        })
    })
    
// })

    $scope.creercarte = {}
    // $scope.getThing = getThing;
    // $scope.getThing = function(address, port)
    // {
    //     $scope.conf = {};
    //     $scope.conf.address = address;
    //     $scope.conf.port = port;

    //     $http.get('http://'+address+':'+port+'/thing')
    //     .success(function(data, status, headers, config)
    //     {
    //         console.log('SUCCESS');
    //         if(200 == data.status_code)
    //         {
    //             $scope.thing = data.data;

    //             // $scope.template = $scope.templates['carteInfos'];
    //         }
    //         else
    //         {
    //             $scope.urlerror = {
    //                 "status_code" : data.status_code,
    //                 "message" : data.message
    //             }
    //             // $scope.template = $scope.templates['error'];
    //         }
    //     })
    //     .error(function(data, status, headers, config)
    //     {
    //         console.log('ERROR')
    //         console.log(data);
    //         console.log(status);
    //         $scope.urlerror = {
    //             "status_code" : status,
    //             "message" : data
    //         } 
    //         // $scope.template = $scope.templates['error'];
    //     });
    // }
    /*
     * EVENTS
     */

     $scope.createCarte = function(e)
    {
        Thing.createCarte($scope);
    }


     $rootScope.$on('putThing', function(event, arg)
     {
        alert('FUCK')
        Thing.getThing($scope.fileConf.configurationServer[0].connection.address, $scope.fileConf.configurationServer[0].connection.port, function(data){
            data.connection = $scope.fileConf.configurationServer[0].connection
            $scope.thing[0].name = arg;
            console.log($scope.thing)
        })
    })
     // $scope.thing = $filter('filter')($scope.cartesList.name, arg, true)
    // });

     // TODO event update

}]);