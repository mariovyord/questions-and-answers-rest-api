const { mapErrors } = require("../utils/mapErrors")

exports.handleError = () => (err, req, res, next) => {
	console.log(`error ${err.message}`)

	const status = err.status || 400

	res.status(status).json({
		"errors": mapErrors(err.message),
	})
}