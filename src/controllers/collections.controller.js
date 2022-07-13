const router = require('express').Router();
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');

const collectionsService = require('../services/collections.service');

// Middleware
router.use('/answers',
	body('body').not().isEmpty().trim().escape(),
	body('owner').not().isEmpty().trim().escape().toLowerCase(),
	body('parent').not().isEmpty().trim().escape(),
	body('meta.question').not().isEmpty().trim().escape(),
	body('meta.circle').not().isEmpty().trim().escape(),
)

// TODO Add more middleware validations

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

router.get('/:collection', async (req, res, next) => {
	try {
		const collection = req.params.collection;
		const query = req.query;
		const result = await collectionsService.getAll(collection, query);

		res.json({
			message: `List of ${collection}`,
			result: result,
		})

	} catch (err) {
		next(err);
	}
})

router.post('/:collection', async (req, res, next) => {
	try {
		// TODO Add data validation and sanitazation
		const collection = req.params.collection;
		const data = req.body;
		const result = await collectionsService.create(collection, data);
		res.status(201)
			.json({
				message: `Created item in ${collection}`,
				result: result,
			});
	} catch (err) {
		next(err);
	}
});

router.get('/:collection/:_id', async (req, res, next) => {
	try {
		const collection = req.params.collection;
		const _id = req.params._id;
		const result = await collectionsService.getOne(collection, _id);

		res.json({
			message: `Details of item in ${collection}`,
			result: result,
		})

	} catch (err) {
		next(err);
	}
})

router.put('/:collection/:_id', async (req, res, next) => {
	try {
		// TODO Add data validation and sanitazation
		const collection = req.params.collection;
		const _id = req.params._id;
		const result = await collectionsService.update(collection, _id, req.body);
		res.json({
			message: `Updated item in ${collection}`,
			result: result,
		});
	} catch (err) {
		next(err);
	}
});

router.delete('/:collection/:_id', async (req, res, next) => {
	try {
		// TODO Add data validation and sanitazation
		const collection = req.params.collection;
		const _id = req.params._id;
		await collectionsService.delete(_id);

		res.status(202).json({
			message: `Deleted item in ${collection}`,
		});
	} catch (err) {
		next(err);
	}
});

module.exports = router;

