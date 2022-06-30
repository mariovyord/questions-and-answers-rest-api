const User = require('../models/User');
const { ObjectId } = require('mongoose').Types;
const bcrypt = require('bcrypt');
const RefreshToken = require('../models/RefreshToken');
const jwt = require('jsonwebtoken');

const saltRounds = 10;

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

exports.logout = async (token) => {
	const decoded = jwt.decode(token, { complete: true });
	console.log(decoded)
	const data = await RefreshToken.findOneAndDelete({ userId: decoded.payload._id });
	console.log(data)
}

exports.getNewTokens = async (refreshToken) => {
	return new Promise(function (resolve, reject) {
		jwt.verify(refreshToken, saltRounds, (err, user) => {
			if (err) return reject(err);

			RefreshToken({ userId: user._id }).then(x => {
				bcrypt.compare(refreshToken, x.refreshToken).then((err) => {
					if (err) return reject(err);

					resolve(createSession(user));
				})
			})
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

	const refreshToken = new RefreshToken({
		refreshToken: await bcrypt.hash(result.refreshToken, saltRounds),
		userId: user._id
	})

	await refreshToken.save();

	return result;
}

/*
1. Delete old refresh token
2. Hash the rehresh token
3. Delete refresh token on logout
*/ 