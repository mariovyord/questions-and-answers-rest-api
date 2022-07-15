const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// TODO Add more verification
const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, 'Username is required'],
		minlength: 4,
		maxlength: 30,
		unique: true,
	},
	firstName: {
		type: String,
		required: [true, 'First name is required'],
		minlength: 1,
		maxlength: 30,
	},
	lastName: {
		type: String,
		required: [true, 'Last name is required'],
		minlength: 1,
		maxlength: 30,
	},
	password: {
		type: String,
		required: [true, 'Password name is required'],
		minlength: 6,
		maxlength: 60,
	},
	description: {
		type: String,
		maxlength: 60,
	},
	imageUrl: {
		type: String,
		// TODO Change default image
		default: 'https://genslerzudansdentistry.com/wp-content/uploads/2015/11/anonymous-user.png'
	},
	role: {
		type: String,
		enum: ['user', 'moderator', 'admin'],
		default: 'user'
	},
},
	{ timestamps: true }
)

userSchema.methods.comparePassword = async function (password) {
	return bcrypt.compare(password, this.password);
}

userSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		this.password = await bcrypt.hash(this.password, 10);
		console.log('Hashing new password');
	}
	next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;