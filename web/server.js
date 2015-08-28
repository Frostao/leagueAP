var express = require('express');
var app = express();

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