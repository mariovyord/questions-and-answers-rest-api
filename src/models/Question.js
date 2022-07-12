const { Schema, Type: { ObjectId }, model } = require('mongoose');

// TODO Add more verification
const questionSchema = new Schema({
	body: {
		type: String,
		required: true,
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
	meta: {
		circle: {
			type: String,
			required: true,
		}
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