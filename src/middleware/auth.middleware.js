const jwt = require('jsonwebtoken');

exports.authenticateToken = () => (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const accessToken = authHeader && authHeader.split(' ')[1];

	if (accessToken === null) {
		res.status(401).json({
			message: 'Unauthorized'
		})
	}

	jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
		if (err) {
			res.status(403).json({
				message: 'Token not valid'
			})
		}
		req.user = user;
		next();
	})
};
