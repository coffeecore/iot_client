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
        Thing.getThing(arg[1], arg[2], function(data){
            $scope.thing = data;
        // })

            if(undefined != $scope.thing.status_code)
            {
                Template.change('error', $scope)
            }
            else
            {
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

    });

    $rootScope.$on('selectGpio', function(event, arg) {
        Thing.getThing(arg[1], arg[2], function(data){
            $scope.thing = data;
            console.log($scope.thing)
        })
        Thing.getGpio($scope, arg[0]);

        Template.change('gpioInfos', $scope)
        // console.log($scope.slugGpio);
        })
    ;

    $scope.putThing = function()
    {
        Thing.putThing(this.thing);
        console.log(this.thing)
        $('.modal').modal('hide');
    }

    $scope.putGpio = function(slug)
    {
        Thing.putGpio(slug, $scope, this.gpio);
        console.log(this.gpio)
        $('.modal').modal('hide');
    }

}]);