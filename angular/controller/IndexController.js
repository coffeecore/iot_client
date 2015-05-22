Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
};

var iotClient = angular.module('iotClient',[]);

var templateDir = '/angular/templates/'

var templates = 
    {
        "carteInfos":
        {
            name: 'carteInfos.html',
            url: templateDir+'carteInfos.html'
        },
        "gpioInfos":
        {
            name: 'gpioInfos.html',
            url: templateDir+'gpioInfos.html'
        },
        "error":
        {
            name: 'error.html',
            url: templateDir+'error.html'
        }
    };

iotClient.factory('Thing', function ($http, $filter) {

    var conf = {};

    return{
        getThing: function(address, port, callback)
        {
            conf.address = address;
            conf.port = port;
            $http.get('http://'+conf.address+':'+conf.port+'/thing')
            .success(function(data, status, headers, config)
            {
                callback(data.data)
            })
            .error(function(data, status, headers, config)
            {
                console.log('ERROR')
                console.log(data);
                console.log(status);
                callback({
                    "status_code" : status,
                    "message" : data
                });
            })
        },
        putThing: function(th, the)
        {
            $http(
                {
                    method: 'PUT',
                    url: 'http://'+conf.address+':'+conf.port+'/thing',
                    headers:
                    {
                        'Content-Type': 'application/json'
                    },
                    data:
                    {
                        "thing" : th
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
            })
        },
        createCarte : function(scope)
        {
            console.log(scope.creercarte)
            $http(
                {
                    method: 'POST',
                    url: document.URL+'modifiedconf',
                    headers:
                    {
                        'Content-Type': 'application/json'
                    },
                    data:
                    {
                        "thing" : scope.creercarte
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
        },
        getGpio: function(scope, slug)
        {
            var i = 0;

            // console.log(scope.thing.gpios[0])

            while(i<scope.thing.gpios.length && scope.thing.gpios[i].slug != slug)
            {
                i++;
            }

            scope.slugGpio = scope.thing.gpios[i].slug
        },
        putGpio: function(slug, scope, gpio)
        {
            
            var gpio = $filter('filter')(scope.thing.gpios, {slug:slug}, true)
            console.log(gpio)
            $http(
                {
                    method: 'PUT',
                    url: 'http://'+conf.address+':'+conf.port+'/thing/gpio',
                    headers:
                    {
                        'Content-Type': 'application/json'
                    },
                    data:
                    {
                        "gpio" : gpio
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
                $scope.urlerror = {
                    "status_code" : status,
                    "message" : data
                } 
                $scope.template = $scope.templates['error'];
            });
        }
    };
});


iotClient.factory('Template', function () {

    return{
        change: function(fileTemplate, scope)
        {
            // console.log(fileTemplate)

            scope.template = templates[fileTemplate];
        },
        post: function(url)
        {
            return $http.post(url);
        }
    };
});
// iotClient.controller('AjaxController', ['$scope', '$http', '$filter', function($scope, $http, $filter)
// {

// }]);