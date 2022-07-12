require('dotenv').config()

const express = require('express');
const { handleError } = require('./src/middleware/handleErrors.middleware');
const router = require('./src/router');

const port = process.env.CONNECTION_STRING || 3030;

const connectionString = process.env.CONNECTION_STRING || 'mongodb://localhost:27017/questions-and-answers';

(async function start() {
	const app = express();

	await require('./src/config/database')(connectionString);

	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	app.use(router);
	app.use(handleError());

	app.listen(port, () => console.log('Server is listening on port ' + port));
})();

/* 
TODO
1. Add CORS middleware
2. Add Helmet Js
*/