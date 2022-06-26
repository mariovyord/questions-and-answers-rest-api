require('dotenv').config()

const express = require('express');
const router = require('./src/router');

const port = process.env.CONNECTION_STRING || 3000;

// TODO ADD DB TO CONNECTION STRING
const connectionString = process.env.CONNECTION_STRING || 'mongodb://localhost:27017/q-and-a';

(async function start() {
	const app = express();

	await require('./src/config/database')(connectionString);

	app.use(express.urlencoded({ extended: true }));

	app.use(router);

	app.listen(port, () => console.log('App is listening on port ' + port));
})();