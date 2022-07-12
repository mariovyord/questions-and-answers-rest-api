const router = require('express').Router();
const circlesService = require('../services/circles.service');

router.get('/', async (req, res, next) => {
	try {
		const circles = await circlesService.getAll();

		res.json({
			message: 'List of circles',
			result: circles,
		})

	} catch (err) {
		next(err);
	}
})

router.post('/', async (req, res, next) => {
	try {
		// TODO Add data validation and sanitazation
		const circle = await circlesService.create(req.body);
		res.status(201)
			.json({
				message: "Circle created",
				result: circle,
			});
	} catch (err) {
		next(err);
	}
})

router.put('/:_id', async (req, res, next) => {
	try {
		// TODO Add data validation and sanitazation
		const _id = req.params._id;
		const circle = await circlesService.update(_id, req.body);
		res.json({
			message: "Circle updated",
			result: circle,
		});
	} catch (err) {
		next(err);
	}
});

router.delete('/:_id', async (req, res, next) => {
	try {
		// TODO Add data validation and sanitazation
		const _id = req.body._id;

		await circlesService.delete(_id);

		res.status(202).json({
			message: "Circle deleted",
		});
	} catch (err) {
		next(err);
	}
});

module.exports = router;