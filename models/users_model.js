'use strict';

let mongoose = require('../config/connectMongoose.js');
let Schema = mongoose.Schema;

// mongoose schema
let UserSchema = new Schema({
	username: { 
		type: String,
		required: true, 
		index: { 
			unique: true, 
			sparse: true 
		}
	},
	email: String,
	password: String,
	upload_date: String
});

module.exports = mongoose.model('User', UserSchema);
