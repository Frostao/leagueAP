var express = require('express');
var app = express();
var cors = require('cors');

app.use(cors());

app.use(express.static(__dirname + '/app'));

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

app.get('/api/all', function(req, res) {
	json = getStaticJSON('output.json');
  	res.json(json);
});

app.get('/api/champion/id/:champId', function(req, res) {
	json = getStaticJSON('output.json');
	var champId = req.params.champId;
	for(i = 0; i < 122; i++){
    	if(json[i].id === champId) {
            json[i].items.sort(function(a, b) { 
                return b.freq - a.freq;
            })
            for(j = 0; j < json[i].items.length; j++) {
                if (json[i].items[j].id == 0) {
                    for (k=j; k < json[i].items.length;k++) {
                        if (k != json[i].items.length-2) {
                            json[i].items[k] = json[i].items[k+1];
                        }
                    }
                }
            }
    		res.json(json[i]);
    	}
	}
	res.json("[]");
});

app.listen(7001);

app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500).send('Something Broke!');
})