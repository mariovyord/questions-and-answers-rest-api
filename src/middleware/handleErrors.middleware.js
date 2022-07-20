const { mapErrors } = require("../utils/mapErrors")

exports.handleError = () => (err, req, res, next) => {
	console.log(`error ${err.message}`)

	const status = err.code || 400

	res.status(status).json({
		message: 'Error fetching data',
		errors: mapErrors(err.message),
	})
}