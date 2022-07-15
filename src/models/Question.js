const { Schema, Types: { ObjectId }, model } = require('mongoose');

const questionSchema = new Schema({
	body: {
		type: String,
		required: [true, "Question can't be empty"],
		minlength: [6, 'Minimum length is 6 characters']
	},
	owner: {
		type: ObjectId,
		ref: 'User',
		required: [true, 'Owner ID is required'],
	},
	parent: {
		type: ObjectId,
		ref: 'Circle',
		required: [true, 'Circle ID is required']
	},
	isHidden: {
		type: Boolean,
		default: false,
	}
},
	{ timestamps: true }
)

const Question = model('Question', questionSchema);

module.exports = Question;