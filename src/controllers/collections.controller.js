const router = require('express').Router();
const mongoose = require('mongoose');

const circlesController = require('./circles.controller');


// Return list of collections
router.get('/', (req, res) => {
	mongoose.connection.db.listCollections().toArray(function (err, names) {
		if (err) {
			res.status(500).json({
				message: 'Error retrieving list of collections',
			});
		}
		else {
			res.json({
				message: 'List of collections',
				result: names?.filter(x => x.name !== 'refreshtokens').map(x => x.name),
			});
		}
	});
});

// Circles
router.use('/circles', circlesController);

module.exports = router;

