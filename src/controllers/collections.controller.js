const router = require('express').Router();
const mongoose = require('mongoose');
const { handleError } = require('../middleware/handleErrors.middleware');

const circlesController = require('./circles.controller');
const questionsController = require('./questions.controller');
const answersController = require('./answers.controller');
const commentsController = require('./comments.controller');


// Return list of collections
router.get('/', (req, res, next) => {
	mongoose.connection.db.listCollections().toArray(function (err, names) {
		if (err) {
			next(err);
		}
		else {
			res.json({
				message: 'List of collections',
				result: names?.filter(x => x.name !== 'refreshtokens').map(x => x.name),
			});
		}
	});
});

router.get('/:collection/:id', (req, res) => {
	console.log(req.params.collection, req.params.id);
	res.end();
})

// Circles
router.use('/circles', circlesController, handleError());
router.use('/questions', questionsController, handleError());
router.use('/answers', answersController, handleError());
router.use('/comments', commentsController, handleError());

module.exports = router;

