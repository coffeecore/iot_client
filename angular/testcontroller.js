var myApp = angular.module('myApp',[]);

myApp.controller('TestController', ['$scope', function($scope)
{
    $scope.carteList = conf.configurationServer;

    // $scope.gpios = jstores.gpios;


    $scope.templates =
    [
        {
            name: 'template1.html',
            url: 'templates/template1.html'
        },
        {
            name: 'template2.html',
            url: 'templates/template2.html'
        }
    ];
    $scope.template = $scope.templates[0];


    $scope.loadCarte = function()
    {
        alert('CLICKUZ')
        $scope.template = $scope.templates[1];
        console.log($scope.template)
    }




}]);

// function TestController($scope)
// {
//     // $scope.jstores = jstores;
//     $scope.jstores = 3;
// }