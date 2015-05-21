// var iotClient = angular.module('iotClient',[]);

iotClient.controller('CarteController', [
    '$rootScope', 
    '$scope', 
    '$http', 
    '$filter', 
    'Thing', 
    'Template', 
    function(
        $rootScope, 
        $scope, 
        $http, 
        $filter, 
        Thing,
        Template
    )
{
    $rootScope.$on('selectCarte', function(event, arg) {
        Thing.getThing(arg[0], arg[1], function(data){
            $scope.thing = data;
            if(undefined != $scope.thing.status_code)
            {
                alert('UZ')
                Template.change('error', $scope)
            }
            else
            {
                alert('UZUZ')
                Template.change('carteInfos', $scope)
            }
        })
        // console.log($scope.thing)
        // if(undefined != $scope.thing.status_code)
        // {
        //     alert('UZ')
        //     Template.change('error', $scope)
        // }
        // else
        // {
        //     Template.change('infosGpio', $scope)
        // }
        console.log($scope.template);

    });

    $rootScope.$on('selectGpio', function(event, arg) {
        // Thing.getThing(arg[0], arg[1], function(data){
        //     $scope.thing = data;
        //     console.log($scope.thing)
        // })
        Thing.getGpio($scope, arg);
        Template.change('gpioInfos', $scope)
        // console.log($scope.slugGpio);
    });

}]);