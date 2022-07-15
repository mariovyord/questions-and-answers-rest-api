const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { signup, login, getNewTokens, logout } = require('../services/auth.service');

const blacklist = ['-', ' ', '.', ',', ';', '/', '<', '>', '?', '{', '}'];

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
	body('username').trim().toLowerCase().blacklist(blacklist).escape(),
	body('firstName').trim().escape(),
	body('lastName').trim().escape(),
	body('password').trim(),
	body('description').trim().escape(),
	async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) throw new Error(errors);

			const userData = req.body;
			const result = await signup(userData);

			res.json(result);

		} catch (err) {
			// TODO Add ErrorMapper
			res.status(400).json({
				message: err.message || 'Something went wrong'
			})
		}
	});

router.post('/login',
	body('username').trim().not().isEmpty().toLowerCase().escape(),
	body('password').trim().not().isEmpty().escape(),
	async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) throw new Error();

			const userData = req.body;
			const result = await login(userData.username, userData.password);

			res.json(result);

		} catch (err) {
			return res.status(401).json({ message: 'Incorrect username or password' });
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

			res.json(newTokens);
		} catch (err) {
			return res.sendStatus(err.code || 401);
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
			res.sendStatus(204);
		} catch (err) {
			res.sendStatus(400);
		}
	}
)

module.exports = router;