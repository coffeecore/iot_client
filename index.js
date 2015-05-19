var express = require('express');
var url = require('url');
var request = require('request-json');
var querystring = require('querystring');
var ClientRender = require('./ClientRender');

var app = express();

// var client = request.createClient('http://localhost:3000/');

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
// var clients = new Array();
// conf.configurationServer.forEach(function(elem)
// {
//     // console.log(elem);
//     client = request.createClient('http://'+elem.connection.address+':'+elem.connection.port+'/');
//     // console.log(client)
//     clients.push(client);
// });

// conf.configurationServer.forEach(function(elem)
// {
//     // console.log(elem.id);
//     // console.log(elem.methodurl)
//     // ClientRender.aff('/', 'index', 'Titre de ma page', res, 'get');
// });

var ClientRender = new ClientRender();

app.set('views', './views');

app.use('/angular', express.static('angular'));

app.use('/conf', express.static('conf'));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', function(req, res)
{
    var result = {
        "title": 'First titre', 
        "data":
        [
            {"conf": conf}
        ]
    };
    res.status(res.statusCode).render('index', result);
    // res.status('404').render('404', result);


  // ClientRender.aff('/thing', 'index', 'Titre de ma page', res, 0, 'get');  
})

app.get('/:carte/:methode/:type', function(req, res)
{
    console.log('methode '+req.params.methode);
    console.log('carte '+req.params.carte);
    
    var carteCalled = req.params.carte;
    var methodeCalled = req.params.methode;
    var typeCalled = req.params.type;

    var carteSelected;

    conf.configurationServer.forEach(function(elem)
    {
        console.log('elem id '+elem.id);
        // console.log('elem method '+JSON.stringify(elem.methodurl))
        if(elem.id == carteCalled)
        {
            carteSelected = elem;
            return;
        }
        // ClientRender.aff('/', 'index', 'Titre de ma page', res, 'get');
    });

    // var methodeList = Object.keys(carteSelected.methodurl[0]);
    var methodeList = carteSelected.methodurl;

    console.log(Object.keys(methodeList[0]).indexOf(methodeCalled))
    console.log(methodeList[0][methodeCalled])

    if(Object.keys(methodeList[0]).indexOf(methodeCalled) == -1  || methodeList[0][methodeCalled] != typeCalled)
    {
        var result = {title: '404 Page or method not found !'};
        res.status('404').render('404', result);
    }
    else
    {    
        ClientRender.aff('/'+methodeCalled, 'index', 'Titre de ma page', res, carteCalled, typeCalled);
    }
    // res.send();
    // console.log('carteselected '+JSON.stringify(carteSelected))
    // console.log(Object.keys(carteSelected.methodurl[0]))



    // ClientRender.aff('/thing', 'index', 'Titre de ma page', res, 0, 'get');
    // conf.configurationServer.forEach(function(elem)
    // {
    //     console.log(elem.methodurl)
    //     console.log(Object.keys(elem.methodurl))
    //     // ClientRender.aff('/', 'index', 'Titre de ma page', res, 'get');
    // });
    // var fs = require('fs');
    // fs.writeFile("./test", "Hey there!", function(err) {
    //     if(err) {
    //         return console.log(err);
    //     }

    //     console.log("The file was saved!");
    // }); 
});

var server = app.listen(conf.configurationClient.connection.port, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});