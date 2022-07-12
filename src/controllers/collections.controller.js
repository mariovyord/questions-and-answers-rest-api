const router = require('express').Router();
const mongoose = require('mongoose');
const Answer = require('../models/Answer');
const Circle = require('../models/Circle');
const Comment = require('../models/Comment');
const Question = require('../models/Question');


// Return list of collections
router.get('/', (req, res) => {

	mongoose.connection.db.listCollections().toArray(function (err, names) {
		if (err) {
			res.status(500).json({
				message: 'Error retrieving list of collections',
			});
		}
		else {
			console.log(names);
			res.json({
				message: 'List of collections',
				collections: names?.filter(x => x.name !== 'refreshtokens').map(x => x.name),
			});
		}
	});
});

module.exports = router;