const { Schema, Types: { ObjectId }, model } = require('mongoose');

const answerSchema = new Schema({
	body: {
		type: String,
		required: [true, `Answer can't be empty`],
		minlength: [2, 'Minimum length is 2 characters'],
		// maxlength: [1500, 'Maximum length is 1500 characters']
	},
	owner: {
		type: ObjectId,
		ref: 'User',
		required: [true, 'Owner ID is required'],
	},
	question: {
		type: ObjectId,
		ref: 'Question',
		required: [true, 'Parent question ID is required']
	},
	circle: {
		type: ObjectId,
		ref: 'Circle',
		required: [true, 'Circle ID is required']
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
		default: 0,
	},
},
	{ timestamps: true }
)

answerSchema.pre('save', function (next) {
	this.score = this.upvotes.length - this.downvotes.length;
	next();
})

const Answer = model('Answer', answerSchema);

module.exports = Answer;