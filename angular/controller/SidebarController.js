iotClient.controller('SidebarController', ['$scope', '$http', '$filter', 'Thing', function($scope, $http, $filter, Thing)
{
    $http.get('/conf/connections.json')
    .success(function(data)
    {
        console.log('SUCCESS');

        $scope.fileConf = data;

        $scope.cartesList = $scope.fileConf.configurationServer;
    })
    .error(function(data, status)
    {
        console.log('ERROR');
        console.log(data);
        console.log(status)
    });
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


     $scope.$on('selectCarte', function(event, arg)
     {
        Thing.getThing(arg[0], arg[1], function(data){
            $scope.thing = data;
            console.log($scope.thing)
        })
    });

     // TODO event update

}]);