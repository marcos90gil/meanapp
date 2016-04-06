'use strict';

let mongoose = require('../config/connectMongoose.js');
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

// mongoose schema
let TextItemSchema = new Schema({
	title: String,
	body: String,
	type: String,
	user_id: {type: ObjectId, ref: 'User'}
});

module.exports = mongoose.model('TextItem', TextItemSchema);
