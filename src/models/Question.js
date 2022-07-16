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
	circle: {
		type: ObjectId,
		ref: 'Circle',
		required: [true, 'Circle ID is required']
	},
	meta: {
		circle: {
			type: String,
			required: [true, 'Circle is required'],
		},
	},
	isHidden: {
		type: Boolean,
		default: false,
	},
	isEditDisabled: {
		type: Boolean,
		default: false,
	},
},
	{ timestamps: true }
)

const Question = model('Question', questionSchema);

module.exports = Question;