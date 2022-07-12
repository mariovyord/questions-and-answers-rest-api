exports.handleError = () => (err, req, res, next) => {
	console.log(`error ${err.message}`)

	const status = err.status || 400

	res.status(status).json({
		"message": err.message,
	})
}