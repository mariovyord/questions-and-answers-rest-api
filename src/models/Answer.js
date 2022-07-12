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
	likes: {
		type: Number,
		default: 0,
	},
	dislikes: {
		type: Number,
		default: 0,
	}
},
	{ timestamps: true }
)

answerSchema.virtual('score').get(function () {
	return (this.likes - this.dislikes);
})

const Answer = model('Answer', answerSchema);

module.exports = Answer;