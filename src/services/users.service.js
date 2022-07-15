const User = require('../models/User');

exports.getUserData = async (userId, isOwner) => {
	if (isOwner) {
		return User.findById(userId).select('-password -__v');
	} else {
		return User.findById(userId).select('-password -__v -username -role -createdAt -updatedAt');
	}
}

// Only for imageUrl
exports.patchUserData = async (userId, data) => {
	const user = await User.findById(userId).select('-password -__v');
	if (data.imageUrl) {
		user.imageUrl = data.imageUrl;
		await user.save();
		return user;
	}
}