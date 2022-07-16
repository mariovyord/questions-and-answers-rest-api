const { Schema, Types: { ObjectId }, model } = require('mongoose');

const circleSchema = new Schema({
	title: {
		type: String,
		required: [true, 'Title is required'],
		minlength: [3, 'Minimum length is 3 characters']
	},
	owner: {
		type: ObjectId,
		ref: 'User',
		required: [true, 'Owner ID is required'],
	},
	imageUrl: {
		type: String,
		required: [true, 'Image URL is required'],
	},
	description: {
		type: String,
		required: [true, 'Description is required'],
		minlength: [6, 'Minimum length is 6 characters']
	},
	type: {
		type: String,
		enum: ['user', 'core'],
		default: 'user',
	},
	isEditDisabled: {
		type: Boolean,
		default: false,
	},
},
	{ timestamps: true }
)

const Circle = model('Circle', circleSchema);

module.exports = Circle;