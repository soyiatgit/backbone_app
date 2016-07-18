var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema ({
		name : String,
		age : Number,
		exp : Number,
		project : String
	});

module.export = mongoose.model('User', userSchema);