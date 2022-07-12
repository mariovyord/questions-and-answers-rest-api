const { Schema, Types: { ObjectId }, model } = require('mongoose');

// TODO Add more verification
const answerSchema = new Schema({
	body: {
		type: String,
		required: true,
		minlength: [2, 'Minimum length is 2 characters']
	},
	owner: {
		type: ObjectId,
		ref: 'User',
		required: [true, 'Owner ID is required'],
	},
	parent: {
		type: ObjectId,
		ref: 'Question',
		required: [true, 'Parent question ID is required']
	},
	meta: {
		question: {
			type: String,
			required: true,
		},
		circle: {
			type: String,
			required: true,
		}
	},
	upvotes: {
		type: [ObjectId],
		ref: 'User',
		default: [],
	},
	downvotes: {
		type: [ObjectId],
		ref: 'User',
		default: [],
	},
	score: {
		type: Number,
		default: function () {
			return this.upvotes.length - this.downvotes.length;
		}
	},
},
	{ timestamps: true }
)

const Answer = model('Answer', answerSchema);

module.exports = Answer;