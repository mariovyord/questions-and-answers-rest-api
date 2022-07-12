const { Schema, Types: { ObjectId }, model } = require('mongoose');

// TODO Add more verification
const circleSchema = new Schema({
	title: {
		type: String,
		required: true,
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
		required: true,
		minlength: [6, 'Minimum length is 6 characters']
	},
},
	{ timestamps: true }
)

const Circle = model('Circle', circleSchema);

module.exports = Circle;