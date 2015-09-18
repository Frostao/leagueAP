var express = require('express');
var app = express();
var cors = require('cors');

app.use(cors());

app.use(express.static(__dirname + '/app'));

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.write('Something Broke!');
})

var fs = require("fs"),
    json;

function readJsonFileSync(filepath, encoding){

    if (typeof (encoding) == 'undefined'){
        encoding = 'utf8';
    }
    var file = fs.readFileSync(filepath, encoding);
    return JSON.parse(file);
}

function getStaticJSON(file){

    var filepath = __dirname + '/' + file;
    return readJsonFileSync(filepath);
}

function sendChampData(json, req, res) {
    var champId = req.params.champId;
    var found = 0;
    for(i = 0; i < json.length; i++){
        if(json[i].id === champId) {
            found = 1;
            json[i].items.sort(function(a, b) { 
                return b.freq - a.freq;
            })
            for(j = 0; j < json[i].items.length; j++) {
                if (json[i].items[j].id == 0) {
                    json[i].items.splice(j,j+1);
                }
            }
            res.json(json[i]);
        }
    }
    if (found == 0) {
        res.send("Not Found");
    }
}

app.get('/api/all', function(req, res) {
	json = getStaticJSON('output.json');
  	res.json(json);
});

app.get('/api/NA5.11N/champion/id/:champId', function(req, res) {
	json = getStaticJSON('NA5.11Normal.json');
	sendChampData(json, req, res);
});

app.get('/api/NA5.14N/champion/id/:champId', function(req, res) {
    json = getStaticJSON('NA5.14Normal.json');
    sendChampData(json, req, res);
});

app.get('/api/NA5.11R/champion/id/:champId', function(req, res) {
    json = getStaticJSON('NA5.11Ranked.json');
    sendChampData(json, req, res);
});

app.get('/api/NA5.14R/champion/id/:champId', function(req, res) {
    json = getStaticJSON('NA5.14Ranked.json');
    sendChampData(json, req, res);
});

app.get('/api/EUW5.11N/champion/id/:champId', function(req, res) {
    json = getStaticJSON('EUW5.11Normal.json');
    sendChampData(json, req, res);
});

app.get('/api/EUW5.14N/champion/id/:champId', function(req, res) {
    json = getStaticJSON('EUW5.14Normal.json');
    sendChampData(json, req, res);
});

app.get('/api/EUW5.11R/champion/id/:champId', function(req, res) {
    json = getStaticJSON('EUW5.11Ranked.json');
    sendChampData(json, req, res);
});

app.get('/api/EUW5.14R/champion/id/:champId', function(req, res) {
    json = getStaticJSON('EUW5.14Ranked.json');
    sendChampData(json, req, res);
});


app.get('/api/KR5.11R/champion/id/:champId', function(req, res) {
    json = getStaticJSON('KR5.11RANKED.json');
    sendChampData(json, req, res);
});


app.get('/api/KR5.14R/champion/id/:champId', function(req, res) {
    json = getStaticJSON('KR5.14RANKED.json');
    sendChampData(json, req, res);
});

app.get('/api/BR5.11R/champion/id/:champId', function(req, res) {
    json = getStaticJSON('BR5.11Ranked.json');
    sendChampData(json, req, res);
});


app.get('/api/BR5.14R/champion/id/:champId', function(req, res) {
    json = getStaticJSON('BR5.14Ranked.json');
    sendChampData(json, req, res);
});

app.get('/api/BR5.11N/champion/id/:champId', function(req, res) {
    json = getStaticJSON('BR5.11Normal.json');
    sendChampData(json, req, res);
});


app.get('/api/BR5.14N/champion/id/:champId', function(req, res) {
    json = getStaticJSON('BR5.14Normal.json');
    sendChampData(json, req, res);
});


app.get('/api/OCE5.11N/champion/id/:champId', function(req, res) {
    json = getStaticJSON('OCE5.11Normal.json');
    sendChampData(json, req, res);
});


app.get('/api/OCE5.14N/champion/id/:champId', function(req, res) {
    json = getStaticJSON('OCE5.14Normal.json');
    sendChampData(json, req, res);
});


app.get('/api/OCE5.11R/champion/id/:champId', function(req, res) {
    json = getStaticJSON('OCE5.11Ranked.json');
    sendChampData(json, req, res);
});


app.get('/api/OCE5.14R/champion/id/:champId', function(req, res) {
    json = getStaticJSON('OCE5.14Ranked.json');
    sendChampData(json, req, res);
});

app.get('/api/LAN5.11R/champion/id/:champId', function(req, res) {
    json = getStaticJSON('LAN5.11Ranked.json');
    sendChampData(json, req, res);
});

app.get('/api/LAN5.14R/champion/id/:champId', function(req, res) {
    json = getStaticJSON('LAN5.14Ranked.json');
    sendChampData(json, req, res);
});

app.get('/api/LAN5.11N/champion/id/:champId', function(req, res) {
    json = getStaticJSON('LAN5.11Normal.json');
    sendChampData(json, req, res);
});

app.get('/api/LAN5.14N/champion/id/:champId', function(req, res) {
    json = getStaticJSON('LAN5.14Normal.json');
    sendChampData(json, req, res);
});

app.get('/api/LAS5.11N/champion/id/:champId', function(req, res) {
    json = getStaticJSON('LAS5.11Normal.json');
    sendChampData(json, req, res);
});

app.get('/api/LAS5.14N/champion/id/:champId', function(req, res) {
    json = getStaticJSON('LAS5.14Normal.json');
    sendChampData(json, req, res);
});

app.get('/api/LAS5.11R/champion/id/:champId', function(req, res) {
    json = getStaticJSON('LAS5.11Ranked.json');
    sendChampData(json, req, res);
});

app.get('/api/LAS5.14R/champion/id/:champId', function(req, res) {
    json = getStaticJSON('LAS5.14Ranked.json');
    sendChampData(json, req, res);
});

app.get('/api/EUNE5.11R/champion/id/:champId', function(req, res) {
    json = getStaticJSON('EUNE5.11Ranked.json');
    sendChampData(json, req, res);
});

app.get('/api/EUNE5.14R/champion/id/:champId', function(req, res) {
    json = getStaticJSON('EUNE5.14Ranked.json');
    sendChampData(json, req, res);
});

app.get('/api/EUNE5.11N/champion/id/:champId', function(req, res) {
    json = getStaticJSON('EUNE5.11Normal.json');
    sendChampData(json, req, res);
});

app.get('/api/EUNE5.14N/champion/id/:champId', function(req, res) {
    json = getStaticJSON('EUNE5.14Normal.json');
    sendChampData(json, req, res);
});

app.get('/api/TR5.11N/champion/id/:champId', function(req, res) {
    json = getStaticJSON('TR5.11Normal.json');
    sendChampData(json, req, res);
});

app.get('/api/TR5.14N/champion/id/:champId', function(req, res) {
    json = getStaticJSON('TR5.14Normal.json');
    sendChampData(json, req, res);
});

app.get('/api/KR5.11N/champion/id/:champId', function(req, res) {
    json = getStaticJSON('KR5.11Normal.json');
    sendChampData(json, req, res);
});

app.get('/api/KR5.14N/champion/id/:champId', function(req, res) {
    json = getStaticJSON('KR5.14Normal.json');
    sendChampData(json, req, res);
});


app.get('/api/TR5.11R/champion/id/:champId', function(req, res) {
    json = getStaticJSON('TR5.11Ranked.json');
    sendChampData(json, req, res);
});

app.get('/api/TR5.14R/champion/id/:champId', function(req, res) {
    json = getStaticJSON('TR5.14Ranked.json');
    sendChampData(json, req, res);
});

app.get('/api/RU5.11R/champion/id/:champId', function(req, res) {
    json = getStaticJSON('RU5.11Ranked.json');
    sendChampData(json, req, res);
});

app.get('/api/RU5.14R/champion/id/:champId', function(req, res) {
    json = getStaticJSON('RU5.14Ranked.json');
    sendChampData(json, req, res);
});

app.get('/api/RU5.11N/champion/id/:champId', function(req, res) {
    json = getStaticJSON('RU5.11Normal.json');
    sendChampData(json, req, res);
});

app.get('/api/RU5.14N/champion/id/:champId', function(req, res) {
    json = getStaticJSON('RU5.14Normal.json');
    sendChampData(json, req, res);
});

app.listen(7001);

