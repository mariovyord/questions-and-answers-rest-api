const router = require('express').Router();
const questionsService = require('../services/questions.service');

router.get('/', async (req, res, next) => {
	try {
		const questions = await questionsService.getAll();

		res.json({
			message: 'List of questions',
			result: questions,
		})

	} catch (err) {
		next(err);
	}
})

router.post('/', async (req, res, next) => {
	try {
		// TODO Add data validation and sanitazation
		const question = await questionsService.create(req.body);
		res.status(201)
			.json({
				message: "Question created",
				result: question,
			});
	} catch (err) {
		// TODO Return errors array
		next(err);
	}
})

router.put('/', async (req, res, next) => {
	try {
		// TODO Add data validation and sanitazation
		const question = await questionsService.update(req.body);
		res.json({
			message: "Question updated",
			result: question,
		});
	} catch (err) {
		next(err);
	}
});

router.delete('/', async (req, res, next) => {
	try {
		// TODO Add data validation and sanitazation
		const _id = req.body._id;

		await questionsService.delete(_id);

		res.status(202).json({
			message: "Question deleted",
		});
	} catch (err) {
		next(err);
	}
});

module.exports = router;