const router = require('express').Router();
const commentsService = require('../services/comments.service');

// All
router.get('/', async (req, res, next) => {
	try {
		const parentId = req.body.parentId;
		const comments = await commentsService.getAllByParentId(parentId);

		res.json({
			message: 'List of comments',
			result: comments,
		})

	} catch (err) {
		next(err);
	}
});

router.post('/', async (req, res, next) => {
	try {
		// TODO Add data validation and sanitazation
		const comment = await commentsService.create(req.body);
		res.status(201)
			.json({
				message: "Comment created",
				result: comment,
			});
	} catch (err) {
		next(err);
	}
});

// Get One
router.get('/:_id', async (req, res, next) => {
	try {
		const _id = req.params._id;

		const comment = await commentsService.getOne(_id);

		res.json({
			message: 'Comment details',
			result: comment,
		})

	} catch (err) {
		next(err);
	}
});

router.put('/:_id', async (req, res, next) => {
	try {
		// TODO Add data validation and sanitazation
		const _id = req.params._id;
		const comment = await commentsService.update(_id, req.body);
		res.json({
			message: "Comment updated",
			result: comment,
		});
	} catch (err) {
		next(err);
	}
});

router.delete('/:_id', async (req, res, next) => {
	try {
		// TODO Add data validation and sanitazation
		const _id = req.params._id;

		await commentsService.delete(_id);

		res.status(202).json({
			message: "Comment deleted",
		});
	} catch (err) {
		next(err);
	}
});

module.exports = router;