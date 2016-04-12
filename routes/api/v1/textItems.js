'use strict';

let express = require('express');
let router = express.Router();
let TextItem = require('../../../models/textItems_model.js');

// routes restful for text items
router.route('/')
	
	/* GET request to all the text items in db  */
	.get(function(req, res) {
		
		TextItem.find(function(err, data) {
			if (err) {
				return res.json({ result: false, error: err });
			}
			return res.json({ result: true, data });
		});
			
	})

	/* POST request save text items  */
	.post(function(req, res) {

		let textItem = new TextItem(req.body);

		textItem.save(function(err, data) {
			if (err) {
				return res.json({ result: false, error: err });
			}
			return res.json({ result: true, data });
		});

	})

	/* DELETE request to reset the text items */
	.delete(function(req, res) {
		
		TextItem.remove(function(err) {
			if (err) {
				return res.json({ result: false, error: err });
			}
			return res.json({ result: true, data: 'DELETED' });
		});

	});

// routes restful with parameters
router.route('/:id')

	/* GET request for text items by id  */
	.get(function(req, res) {
		TextItem.findById(req.params.id, function(err, data) {
			if (err) {
				return res.json({ result: false, error: err });
			}
			return res.json({ result: true, data });
		});

	})

	/* PUT request for editing a text item by id  */
	.put(function(req, res) {
		let options = {};
		TextItem.update({ _id: req.params.id }, { $set: req.body }, options, 
			function(err, data) {
				if (err) {
					return res.json({ result: false, error: err });
				}
				return res.json({ result: true, data });
			}
		);

	})

	/* DELETE request to remove an specific text item */
	.delete(function(req, res) {
		TextItem.remove({
			_id: req.params.id
			}, function(err) {
				if (err) {
					return res.json({ result: false, error: err });
				}
				return res.json({ result: true, data: 'DELETED' });
			}
		);

	});

module.exports = router;
