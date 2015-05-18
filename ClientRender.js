var url = require('url');
var querystring = require('querystring');
var request = require('request-json');

var client = request.createClient('http://localhost:3000/');


function ClientRender ()
{
}
ClientRender.prototype.aff = function(uri, template, title, res, type)
{
    if(undefined == type || 'get' == type)
    {
        client.get(uri, function(err, response, body)
        {
            if(undefined != body)
            {
                var result = {title: title, jstores: body};
            }
            else
            {
                var result = {title: title, jstores: ''};
            }
            res.status(response.statusCode).render(template, result);
        });
    }
    else if('post' == type)
    {
        client.post(uri, undefined, function(err, response, body)
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
            res.status(response.statusCode).render(template, result);
        });
    }
};

module.exports = ClientRender;