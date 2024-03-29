const router = require('express').Router();
const authController = require('./controllers/auth.controller');
const collectionsController = require('./controllers/collections.controller');
const usersController = require('./controllers/users.controller');

router.use((req, res, next) => {
	console.log('>>>', req.method, req.url);
	next();
})

router.get('/', (req, res) => {
	res.json({
		message: 'Path should start with /api',
	})
});

router.get('/api', (req, res) => {
	res.json({
		message: 'Hello to Questions and Answers REST Api',
		endpoints: ['/collections', '/auth', '/users']
	})
});

router.use('/api/collections', collectionsController);

router.use('/api/users', usersController);

router.use('/api/auth', authController);

router.all('*', (req, res) => {
	res.status(404).json({
		message: 'Path not found'
	})
})

module.exports = router;