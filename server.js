var express  = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/userRoll');
var Schema = mongoose.Schema;
var userSchema = new Schema ({
		name : String,
		age : Number,
		exp : Number,
		project : String
	});
mongoose.model('User', userSchema);
var Users = mongoose.model('User');

// var user = new Users({
	// name: "Saurabh",
	// age: 23,
	// exp: 2.5,
	// project : "WWWT"
// })
// user.save();
var app = new express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/api/users', function(req, res){
	console.log("request arrived");
	Users.find(function(err, data){
		//console.log(data);
		res.send(data);
	})
});

app.post('/api/users', function(req, res){
	console.log('POST req arrived with ' + req.body);
	var user = new Users(req.body);
	user.save(function(err, data){
		res.send(data);
	})
});

app.delete('/api/users/:id',function(req, res){
	console.log("Received DELETE request with ID: "+ req.params.id);
	Users.remove({_id: req.params.id}, function(err){
		res.send({_id: req.params.id});
	});
});

app.put('/api/users/:id', function(req, res){
	console.log('Got a PUT request with id: ' + req.params.id);
	Users.update({_id: req.params.id}, req.body, function(err){
		res.send({_id: req.params.id});
	});
});

var port = 4000;
app.listen(port);
console.log("app on server port: " + port);