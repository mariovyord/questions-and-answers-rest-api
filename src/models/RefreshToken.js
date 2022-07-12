const { mongoose, Types: { ObjectId } } = require('mongoose');

// TODO Add more verification
const RefreshTokenSchema = new mongoose.Schema({
	refreshToken: {
		type: String,
		required: true,
	},
	userId: {
		type: ObjectId,
		ref: 'User',
		required: true,
	}
},
	{ timestamps: true }
)

const RefreshToken = mongoose.model('RefreshToken', RefreshTokenSchema);

module.exports = RefreshToken;