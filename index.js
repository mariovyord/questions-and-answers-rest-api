require('dotenv').config()

const express = require('express');
var cors = require('cors')
const router = require('./src/router');
const { handleError } = require('./src/middleware/handleErrors.middleware');

const port = process.env.PORT || 3030;

// const connectionString = process.env.CONNECTION_STRING || 'mongodb://localhost:27017/questions-and-answers';
const connectionString = 'mongodb+srv://mario:mariopernik123@cluster0.mfybekg.mongodb.net/questions-and-answers';

(async function start() {
	const app = express();

	await require('./src/config/database')(connectionString);

	app.enable('trust proxy');
	app.use(cors());
	app.use(express.json({
		limit: '300kb'
	}));
	app.use(express.urlencoded({ extended: true }));

	app.use(router);
	app.use(handleError());

	app.listen(port, () => console.log('Server is listening on port ' + port));
})();