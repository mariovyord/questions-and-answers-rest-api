const router = require('express').Router();
const { signup, login } = require('../services/auth.service');


// TODO Add Express Validator
router.post('/signup', async (req, res) => {
	try {
		const userData = req.body;
		const result = await signup(userData);

		res.json(result);
	} catch (err) {
		res.json({
			message: 'Error'
		})
	}
});

router.post('/login', async (req, res) => {
	try {
		const userData = req.body;
		const result = await login(userData.username, userData.password);

		res.json(result);
	} catch (err) {
		res.json({
			message: 'why'
		})
	}
});

router.post('/logout', (req, res) => {
	res.status(200).json({
		message: 'Logout succesful'
	})
})

module.exports = router;