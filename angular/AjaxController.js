var iotClient = angular.module('iotClient',[]);

iotClient.controller('AjaxController', ['$scope', '$http', '$filter', function($scope, $http, $filter)
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
    $scope.conf = {};
    $scope.conf.templateDir = '/angular/templates/';

    $scope.templates = 
    {
        "carteInfos":
        {
            name: 'carteInfos.html',
            url: $scope.conf.templateDir+'carteInfos.html'
        },
        "gpioInfos":
        {
            name: 'gpioInfos.html',
            url: $scope.conf.templateDir+'gpioInfos.html'
        },
        "error":
        {
            name: 'error.html',
            url: $scope.conf.templateDir+'error.html'
        }
    };

    // $scope.template = $scope.templates['aaa'];

    $scope.createCarte = function()
    {
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
                    "thing" : $scope.creercarte
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
    }

    $scope.getThing = function(address, port)
    {
        $scope.conf.address = address;
        $scope.conf.port = port;

        $http.get('http://'+address+':'+port+'/thing')
        .success(function(data, status, headers, config)
        {
            console.log('SUCCESS');
            if(200 == data.status_code)
            {
                $scope.thing = data.data;

                $scope.template = $scope.templates['carteInfos'];
            }
            else
            {
                $scope.urlerror = {
                    "status_code" : data.status_code,
                    "message" : data.message
                }
                $scope.template = $scope.templates['error'];
            }
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

    $scope.getGpio = function(slug)
    {
        // console.log($scope.conf.length)
        // $scope.conf = {};
        // $scope.conf.address = address;
        // $scope.conf.port = port;

        console.log(slug)

        var i = 0;

        while($scope.thing.gpios[i].slug != slug)
        {
            i++;
        }

        console.log($scope.thing.gpios[i]);
        $scope.slugGpio = $scope.thing.gpios[i].slug

        var url;

        // if(undefined == slug)
        // {
        //     // url = 'http://'+address+':'+port+'/thing/gpio';
        // }
        // else
        // {            
            // url = 'http://'+address+':'+port+'/thing/gpio/'+slug;
        // }


        // console.log(url)
        // $http.get(url)
        // .success(function(data, status, headers, config)
        // {
        //     console.log('SUCCESS');
        //     console.log(status)
        //     console.log(data)

        //     if(200 == data.status_code)
        //     {
        //         $scope.gpios = data.data;
        //         if(template)
        //         {
                    $scope.template = $scope.templates['gpioInfos'];
        //         }
        //     }
        //     else
        //     {
        //         $scope.urlerror = {
        //             "status_code" : data.status_code,
        //             "message" : data.message
        //         }
        //         $scope.template = $scope.templates['error'];
        //     }
        // })
        // .error(function(data, status, headers, config)
        // {
        //     console.log('ERROR')
        //     console.log(data);
        //     console.log(status);
        //     $scope.urlerror = {
        //         "status_code" : status,
        //         "message" : data
        //     } 
        //     $scope.template = $scope.templates['error'];

        // });
    }

    /*$scope.getGpio = function(address, port, template, slug)
    {
        // console.log($scope.conf.length)
        $scope.conf = {};
        $scope.conf.address = address;
        $scope.conf.port = port;

        console.log(slug)

        var url;

        if(undefined == slug)
        {
            url = 'http://'+address+':'+port+'/thing/gpio';
        }
        else
        {            
            url = 'http://'+address+':'+port+'/thing/gpio/'+slug;
        }


        console.log(url)
        $http.get(url)
            .success(function(data, status, headers, config)
            {
                console.log('SUCCESS');
                console.log(status)
                console.log(data)

                if(200 == data.status_code)
                {
                    $scope.gpios = data.data;
                    if(template)
                    {
                        $scope.template = $scope.templates['gpioInfos'];
                    }
                }
                else
                {
                    $scope.urlerror = {
                        "status_code" : data.status_code,
                        "message" : data.message
                    }
                    $scope.template = $scope.templates['error'];
                }
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
    }*/

    $scope.getGpioEvent = function(address, port, slug, id)
    {
        $scope.conf = {};
        $scope.conf.address = address;
        $scope.conf.port = port;

        var url;

        if('undefined' == slug)
        {
            console.log('ERROR')
        }
        else
        {  
            if('undefined' == id)
            {
                url = 'http://'+address+':'+port+'/thing/gpio/'+slug+'/event';
            }
            else
            {
                url = 'http://'+address+':'+port+'/thing/gpio/'+slug+'/event/'+id;
            }
        }



        $http.get(url)
            .success(function(data, status, headers, config)
            {
                console.log('SUCCESS');
                console.log(status)
                console.log(data)
                $scope.events = data;
            })
            .error(function(data, status, headers, config)
            {
                console.log('ERROR')
                console.log(data);
                console.log(status);
            });
    }

    $scope.getGpioJob = function(address, port, slug, id)
    {
        $scope.conf = {};
        $scope.conf.address = address;
        $scope.conf.port = port;

        var url;

        if('undefined' == slug)
        {
            console.log('ERROR')
        }
        else
        {  
            if('undefined' == id)
            {
                url = 'http://'+address+':'+port+'/thing/gpio/'+slug+'/job';
            }
            else
            {
                url = 'http://'+address+':'+port+'/thing/gpio/'+slug+'/job/'+id;
            }
        }



        $http.get(url)
            .success(function(data, status, headers, config)
            {
                console.log('SUCCESS');
                console.log(status)
                console.log(data)
                $scope.events = data;
            })
            .error(function(data, status, headers, config)
            {
                console.log('ERROR')
                console.log(data);
                console.log(status);
            });
    }

    $scope.postGpio = function()
    {
        $http(
            {
                method: 'POST',
                url: 'http://'+$scope.conf.address+':'+$scope.conf.port+'/thing/gpio/add',
                headers:
                {
                    'Content-Type': 'application/json'
                },
                data:
                {
                    "gpio" : {
                        "name" : "aaa humidité",
                        "pin"  : "5",
                        "value": "getAAA",
                        "events" : [
                        ],
                        "jobs" : [
                        ]
                    }
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
    $scope.putGpio = function(slugGpio)
    {
        
        var aaa = $filter('filter')(this.thing.gpios, {slug:slugGpio}, true)
        console.log(aaa)
        $http(
            {
                method: 'PUT',
                url: 'http://'+$scope.conf.address+':'+$scope.conf.port+'/thing/gpio',
                headers:
                {
                    'Content-Type': 'application/json'
                },
                data:
                {
                    "gpio" : aaa
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
    };
}]);