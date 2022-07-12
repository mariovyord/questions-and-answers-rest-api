const router = require('express').Router();
const circlesService = require('../services/circles.service');

router.get('/', async (req, res) => {
	try {
		const circles = await circlesService.getAll();

		res.json({
			message: 'List of circles',
			result: circles,
		})

	} catch (err) {
		// TODO Return errors array
		console.log(err);
	}
})

router.post('/', async (req, res) => {
	try {
		// TODO Add data validation and sanitazation
		const circle = await circlesService.create(req.body);
		res.status(201)
			.json({
				message: "Circle created",
				result: circle,
			});
	} catch (err) {
		// TODO Return errors array
		console.log(err);
	}
})

router.put('/', async (req, res) => {
	try {
		// TODO Add data validation and sanitazation
		const circle = await circlesService.update(req.body);
		res.json({
			message: "Circle updated",
			result: circle,
		});
	} catch (err) {
		// TODO Return errors array
		console.log(err);
	}
});

router.delete('/', async (req, res) => {
	try {
		// TODO Add data validation and sanitazation
		const _id = req.body._id;

		await circlesService.delete(_id);

		res.status(202).json({
			message: "Circle deleted",
		});
	} catch (err) {
		// TODO Return errors array
		console.log(err);
	}
});

module.exports = router;