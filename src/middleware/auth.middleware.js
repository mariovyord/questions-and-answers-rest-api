const jwt = require('jsonwebtoken');

exports.authenticateToken = () => (req, res, next) => {
	const accessToken = req.headers['x-auth-token'];

	if (!accessToken) return res.sendStatus(401);

	jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
		if (err) return res.sendStatus(403);

		res.locals.user = user;
		next();
	})
};
