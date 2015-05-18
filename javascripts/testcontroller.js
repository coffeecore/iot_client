var myApp = angular.module('myApp',[]);

myApp.controller('TestController', ['$scope', function($scope)
{
    $scope.jstores = jstores;
}]);