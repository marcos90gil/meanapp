'use strict';

// let express = require('express');
// let router = express.Router();
let User = require('../../../models/users_model.js');

/* GET request to the db  */
module.exports = function(app) {

	app.get('/apiv1/users', function(req, res) {
	
		User.find({})
			.exec()
			.then(function(users) {
				return res.json({ result: true, users });
			})
			.then(undefined, function(err) {
				return res.json({ result: false, error: err });
			});

	});

	app.get('*', function(req, res) {
		res.sendfile('../../../public/index.htmls');
	});

};

