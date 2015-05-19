var url = require('url');
var querystring = require('querystring');
var request = require('request-json');

// var client = request.createClient('http://192.168.2.4:3000/');


var conf = require('./conf/connections.json');

/*{"configurationServer":
    [
        {
            "id"        : "nomcarte",
            "connection":
            {
                "address"   : "192.168.2.4",
                "port"      : "8080"
            },
            "methodurl":
            {
                "thing":"get"
            }
        }
    ]*/

// console.log(conf.configurationClient)
var clients = new Array();
conf.configurationServer.forEach(function(elem)
{
    // console.log(elem);
    clientId = elem.id;
    client = request.createClient('http://'+elem.connection.address+':'+elem.connection.port+'/');
    // console.log(client)
    clients.push(client);
});

console.log(clients[0]);

function ClientRender ()
{
}
ClientRender.prototype.aff = function(uri, template, title, res, client, type)
{
    if(undefined == type || 'get' == type)
    {
        clients[client].get(uri, function(err, response, body)
        {
            if(undefined != body)
            {
                var result = {title: title, jstores: body};
            }
            else
            {
                var result = {title: title, jstores: ''};
            }
            // console.log(body);
            if('undefined' == response.statusCode || '404' == response.statusCode)
            {
                res.status('404').render('404', result);
            }
            res.status(response.statusCode).render(template, result);
            // res.render(template, result);
        });
    }
    else if('post' == type)
    {
        client[client].post(uri, undefined, function(err, response, body)
        {
            console.log(response.statusCode)
            if(undefined != body)
            {
                var result = {title: title, jstores: body};
            }
            else
            {
                var result = {title: title, jstores: ''};
            }
            if('undefined' == response.statusCode || '404' == response.statusCode)
            {
                res.status('404').render('404', result);
            }
            res.status(response.statusCode).render(template, result);
        });
    }
};

module.exports = ClientRender;