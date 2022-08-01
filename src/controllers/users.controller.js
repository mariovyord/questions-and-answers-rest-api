const router = require('express').Router();
const { body } = require('express-validator');
const { authenticateToken } = require('../middleware/auth.middleware');
const { getUserData, patchUserData } = require('../services/users.service');

router.get('/:_id', authenticateToken(), async (req, res, next) => {
	try {
		const userId = res.locals.user._id;
		const requestUserId = req.params._id;

		let isOwner = false;
		if (userId == requestUserId) isOwner = true;

		const userData = await getUserData(requestUserId, isOwner);

		res.json({
			message: 'User data',
			result: userData
		});
	} catch (err) {
		next(err);
	}
});

// TODO Fix Cors for patch requests
router.patch('/:_id',
	body('firstName').trim().escape(),
	body('lastName').trim().escape(),
	body('description').trim().escape(),
	body('password').trim(),
	body('imageUrl').trim(),
	authenticateToken(),
	async (req, res, next) => {
		try {
			const userId = res.locals.user._id;
			const requestUserId = req.params._id;

			if (userId != requestUserId) throw new Error();

			const data = req.body;
			const userData = await patchUserData(userId, data);

			res.json({
				message: 'User data updated',
				result: userData
			});
		} catch (err) {
			next(err);
		}
	}
);

module.exports = router;
