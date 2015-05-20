var express = require('express');
var url = require('url');
var request = require('request-json');
var querystring = require('querystring');
// var ClientRender = require('./ClientRender');

var app = express();

// var ClientRender = new ClientRender();

app.set('views', './views');

app.use('/angular', express.static('angular'));

app.use('/conf', express.static('conf'));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.get('/', function(req, res)
{
    // var result = {
    //     "title": 'First titre', 
    //     "data":
    //     [

    //     ]
    // };
    // res.status(res.statusCode).render('index', result);
    res.render('index');
})


var server = app.listen(3500, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});