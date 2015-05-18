var express = require('express');
var url = require('url');
var request = require('request-json');
var querystring = require('querystring');
var ClientRender = require('./ClientRender');

var app = express();

var client = request.createClient('http://localhost:3000/');
 
var ClientRender = new ClientRender();

app.set('views', './views');

app.use(express.static('javascripts'));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', function(req, res)
{
    ClientRender.aff('/thing', 'index', 'Titre de ma page', res, 'get');
    var fs = require('fs');
    fs.writeFile("./test", "Hey there!", function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    }); 
});

var server = app.listen(4000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});