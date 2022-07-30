const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { signup, login, getNewTokens, logout } = require('../services/auth.service');
const { mapErrors } = require('../utils/mapErrors');

router.all('/', (req, res) => {
	res.json({
		message: 'Welcome to auth service!',
		endpoints: {
			login: '/login; POST',
			signup: '/signup; POST',
			logout: '/logout; DELETE',
			getNewTokens: '/token; POST',
		}
	})
})

router.post('/signup',
	body('username').trim().toLowerCase().escape(),
	body('firstName').trim().escape(),
	body('lastName').trim().escape(),
	body('password').trim(),
	body('description').trim().escape(),
	async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) throw (errors.array().map(x => ({ message: x.msg })))

			const userData = req.body;
			const result = await signup(userData);

			res.json({
				message: 'Sign up successful',
				result: result,
			});

		} catch (err) {
			res.status(400)
				.json({
					message: 'Sign up failed',
					errors: mapErrors(err),
				})
		}
	});

router.post('/login',
	body('username').trim().toLowerCase().escape(),
	body('password').trim().escape(),
	async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) throw (errors.array().map(x => ({ message: x.msg })))

			const userData = req.body;
			const result = await login(userData.username, userData.password);

			res.json({
				message: 'Login successful',
				result: result,
			});

		} catch (err) {
			return res.status(401)
				.json({
					message: 'Login up failed',
					errors: mapErrors(err),
				});
		}
	}
);

router.post('/token',
	body('refreshToken').trim().not().isEmpty(),
	async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) throw ({
				code: 401
			});

			const refreshToken = req.body.refreshToken;

			if (!refreshToken) throw ({
				code: 401
			});

			const newTokens = await getNewTokens(refreshToken);

			if (newTokens === null) throw ({
				code: 403
			});

			res.json({
				message: 'Refresing tokens successful',
				result: newTokens
			});
		} catch (err) {
			return res.status(err.code || 401)
				.json({
					message: 'Refresing tokens failed',
					errors: mapErrors(err),
				});
		}
	}
);


router.delete('/logout',
	body('refreshToken').trim().not().isEmpty(),
	async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) throw new Error();

			await logout(req.body.refreshToken);

			res.status(200)
				.json({
					message: 'Logout successful',
				});

		} catch (err) {
			res.status(400)
				.json({
					message: 'Logout failed',
					errors: mapErrors(err),
				});
		}
	}
)

module.exports = router;