const router = require('express').Router();

router.use((req, res, next) => {
	console.log('>>>', req.method, req.url);
	next();
})

router.get('/', (req, res) => {
	res.json({
		message: 'Hello World'
	})
});

router.use('/auth', (req, res) => {
	res.json({
		message: 'Hello World'
	})
});

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