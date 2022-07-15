const { mongoose, Types: { ObjectId } } = require('mongoose');

// TODO Add more verification
const SessionSchema = new mongoose.Schema({
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

const Session = mongoose.model('Session', SessionSchema);

module.exports = Session;