const User = require('../models/User');
const RefreshToken = require('../models/RefreshToken');
const jwt = require('jsonwebtoken');

exports.signup = async (userData) => {
	const existing = await User.findOne({ username: new RegExp(userData.username, 'i') });

	if (existing) {
		throw new Error('Username already exists')
	}

	const user = new User(userData);
	await user.save();

	return createSession(user);
}

exports.login = async (username, password) => {
	const user = await User.findOne({ username: username });

	if (!user) {
		throw new Error('Incorrect username or password');
	}

	const match = user.comparePassword(password);

	if (!match) {
		throw new Error('Incorrect username or password');
	}

	return createSession(user);
}

exports.getNewTokens = async (refreshToken) => {
	const token = await RefreshToken({ refreshToken: refreshToken });
	if (token === null) return null;

	return new Promise(function (resolve, reject) {
		jwt.verify(token.refreshToken, process.env.JWT_REFRESH, (err, user) => {
			if (err) return reject(err);

			resolve(createSession(user));
		})

	})

}

async function createSession(userData) {
	const user = {
		_id: userData._id,
		username: userData.username,
		role: userData.role
	}

	const result = {
		accessToken: jwt.sign(
			user,
			process.env.JWT_SECRET,
			{ expiresIn: '30s' }
		),
		refreshToken: jwt.sign(
			user,
			process.env.JWT_REFRESH,
			{ expiresIn: '30d' }
		)
	};

	// TODO Delete old refresh token

	const refreshToken = new RefreshToken({
		refreshToken: result.refreshToken,
		userId: user._id
	})

	await refreshToken.save();

	return result;
}