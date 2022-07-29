const User = require('../models/User');

exports.getUserData = async (userId, isOwner) => {
	if (isOwner) {
		return User.findById(userId).select('-password -__v');
	} else {
		return User.findById(userId).select('-password -__v -username -role -createdAt -updatedAt');
	}
}

exports.patchUserData = async (userId, data) => {
	const user = await User.findById(userId).select('-password -__v');

	// TODO Add change password option
	user.username = data.username || user.username;
	user.firstName = data.firstName || user.firstName;
	user.lastName = data.lastName || user.lastName;
	user.imageUrl = data.imageUrl || user.imageUrl;
	user.description = data.description || user.description;

	await user.save();
	return user;

}