const router = require('express').Router();
const answersService = require('../services/answers.service');

// All
router.get('/', async (req, res, next) => {
	try {
		const answers = await answersService.getAll();

		res.json({
			message: 'List of answers',
			result: answers,
		})

	} catch (err) {
		next(err);
	}
});

router.post('/', async (req, res, next) => {
	try {
		// TODO Add data validation and sanitazation
		const answer = await answersService.create(req.body);
		res.status(201)
			.json({
				message: "Answer created",
				result: answer,
			});
	} catch (err) {
		next(err);
	}
});

// Get One
router.get('/:_id', async (req, res, next) => {
	try {
		const _id = req.params._id;

		const answer = await answersService.getOne(_id);

		res.json({
			message: 'Answer details',
			result: answer,
		})

	} catch (err) {
		next(err);
	}
});

router.put('/:_id', async (req, res, next) => {
	try {
		// TODO Add data validation and sanitazation
		const _id = req.params._id;
		const answer = await answersService.update(_id, req.body);
		res.json({
			message: "Answer updated",
			result: answer,
		});
	} catch (err) {
		next(err);
	}
});

router.delete('/:_id', async (req, res, next) => {
	try {
		// TODO Add data validation and sanitazation
		const _id = req.params._id;

		await answersService.delete(_id);

		res.status(202).json({
			message: "Answer deleted",
		});
	} catch (err) {
		next(err);
	}
});

module.exports = router;