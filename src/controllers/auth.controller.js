const router = require('express').Router();
const { signup, login, getNewTokens, logout } = require('../services/auth.service');

// TODO Add Express Validator
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

router.post('/signup', async (req, res, next) => {
	try {
		const userData = req.body;
		const result = await signup(userData);

		res.json(result);

	} catch (err) {
		next(err);
	}
});

router.post('/login', async (req, res, next) => {
	try {
		const userData = req.body;
		const result = await login(userData.username, userData.password);

		res.json(result);

	} catch (err) {
		next(err);
	}
});

router.post('/token', async (req, res, next) => {
	try {
		const refreshToken = req.body.refreshToken;

		if (refreshToken == null) return res.sendStatus(401);

		const newTokens = await getNewTokens(refreshToken);

		if (newTokens === null) return res.sendStatus(403)

		res.json(newTokens);
	} catch (err) {
		next(err);
	}
})


router.delete('/logout', async (req, res, next) => {
	// TODO Check for token
	try {
		await logout(req.body.refreshToken);

		res.sendStatus(204);
	} catch (err) {
		next(err);
	}
})

module.exports = router;