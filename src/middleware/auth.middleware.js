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

exports.refreshToken = () => (req, res, next) => {
	const authHeader = req.headers['authorization'];

	if (authHeader) {
		return next();
	}

	/*TODO Check for Refresh Token 
	if there is one, grant new Access Token and next()
	
	SHOULD WE HASH REFRESH TOKEN??? yes we should*/
}