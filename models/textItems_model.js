'use strict';

let mongoose = require('../config/connectMongoose.js');
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

// mongoose schema
let TextItemSchema = new Schema({
	title: String,
	body: String,
	type: {
		type: String,
        enum : ['todo', 'bottle', 'thing']
    },
	upload_date: String,
	author: String
});

module.exports = mongoose.model('TextItem', TextItemSchema);
