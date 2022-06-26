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

function createSession(userData) {
	const user = {
		_id: userData._id,
		username: userData.username,
		role: userData.role
	}

	const result = {
		_id: user._id,
		username: user.username,
		accessToken: jwt.sign(
			user,
			process.env.JWT_SECRET,
			{ expiresIn: '30s' }
		),
		refreshToken: jwt.sign(user, process.env.JWT_REFRESH)
	};

	RefreshToken.create({
		refreshToken: result.refreshToken,
		userId: result._id
	});

	return result;
}