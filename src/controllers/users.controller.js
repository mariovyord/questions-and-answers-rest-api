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

// For now works only for imageUrl change
router.patch('/:_id',
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
