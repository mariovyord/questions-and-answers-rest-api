const { Schema, Types: { ObjectId }, model } = require('mongoose');

const answerSchema = new Schema({
	body: {
		type: String,
		required: [true, `Answer can't be empty`],
		minlength: [2, 'Minimum length is 2 characters'],
		maxlength: [1000, 'Maximum length is 1000 characters']
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
	upvotes: {
		type: [ObjectId],
		ref: 'User',
		default: [],
	},
	meta: {
		question: {
			type: String,
			required: [true, 'Question is required'],
		},
		circle: {
			type: String,
			required: [true, 'Circle is required'],
		},
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