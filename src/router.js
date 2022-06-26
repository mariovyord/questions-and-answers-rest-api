const router = require('express').Router();
const authController = require('./controllers/auth.controller');
const { authenticateToken } = require('./middleware/auth.middleware');

router.use((req, res, next) => {
	console.log('>>>', req.method, req.url);
	next();
})

router.get('/', authenticateToken(), (req, res) => {
	res.json({
		message: 'Hello to REST Api'
	})
});

router.use('/auth', authController);

router.use('/data', (req, res) => {
	res.json({
		message: 'Hello World'
	})
});

router.all('*', (req, res) => {
	res.status(404).json({
		message: 'Path not found'
	})
})

module.exports = router;