const User = require('../models/User');
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

	if (user) {
		throw new Error('Incorrect username or password');
	}

	const match = await User.comparePassword(password);

	if (!match) {
		throw new Error('Incorrect username or password');
	}

	return createSession(user);
}

function createSession(user) {
	return {
		_id: user._id,
		username: user.username,
		authToken: jwt.sign({
			_id: user._id,
			username: user.username,
			role: user.role
		}, process.env.JWT_SECRET)
	}
}