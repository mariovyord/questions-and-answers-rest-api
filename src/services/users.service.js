const User = require('../models/User');
const Answer = require('../models/Answer');

exports.getUserData = async (userId, isOwner) => {
	if (isOwner) {
		return User.findById(userId).select('-password -__v');
	} else {
		return User.findById(userId).select('-password -__v -role -createdAt -updatedAt');
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

exports.getLeaderboard = async () => {
	const aggr = [
		{
			'$project': {
				'_id': 0,
				'owner': 1,
				'score': 1
			}
		}, {
			'$group': {
				'_id': '$owner',
				'totalScore': {
					'$sum': '$score'
				}
			}
		}, {
			'$sort': {
				'totalScore': -1
			}
		}, {
			'$limit': 50
		}, {
			'$lookup': {
				'from': 'users',
				'localField': '_id',
				'foreignField': '_id',
				'as': 'user',
				'pipeline': [
					{
						'$project': {
							'_id': 0,
							'username': 1,
							'firstName': 1,
							'lastName': 1
						}
					}
				]
			}
		}
	]

	return (await Answer.aggregate(aggr)).map(x => ({ ...x, user: x.user[0] }));
}