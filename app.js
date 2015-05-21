var express     = require('express');
var url         = require('url');
var request     = require('request-json');
var querystring = require('querystring');
var fs          = require('fs');
var bodyParser  = require('body-parser');
// var ClientRender = require('./ClientRender');

var app = express();

// var ClientRender = new ClientRender();

app.set('views', './views');

app.use('/angular', express.static('angular'));

app.use('/conf', express.static('conf'));

app.use(bodyParser.json());

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

var conf = fs.readFileSync('conf/connections.json', 'UTF-8');
conf = JSON.parse(conf);

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

app.post('/modifiedconf', function(req, res)
{
    // console.log(req.body);

    // console.log(conf)

    var confCarte = req.body.thing;

    conf.configurationServer.push(confCarte);

    conf = JSON.stringify(conf);

    // console.log(conf)
    // console.log(JSON.stringify(conf))

    fs.writeFile('conf/connections.json', conf);

    // console.log(conf)

    res.json({"code":200, "status":"GOOD"});
})


var server = app.listen(conf.configurationClient.connection.port, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});