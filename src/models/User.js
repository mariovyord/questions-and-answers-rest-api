const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, 'Username is required'],
		minlength: 4,
		maxlength: 30,
		unique: true,
		validate: {
			validator: noBlacklisterChars,
			message: 'Username should not contain whitespace or special symbols'
		}
	},
	firstName: {
		type: String,
		required: [true, 'First name is required'],
		minlength: 1,
		maxlength: 30,
		validate: {
			validator: noBlacklisterChars,
			message: 'First name should not contain whitespace or special symbols'
		}
	},
	lastName: {
		type: String,
		required: [true, 'Last name is required'],
		minlength: 1,
		maxlength: 30,
		validate: {
			validator: noBlacklisterChars,
			message: 'Last name should not contain whitespace or special symbols'
		}
	},
	password: {
		type: String,
		required: [true, 'Password name is required'],
		minlength: 6,
		maxlength: 60,
		validate: {
			validator: noBlacklisterChars,
			message: 'Password should not contain whitespace or special symbols'
		}
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

userSchema.pre('save', function (next) {
	this.username = this.username.toLowerCase();
	next();
})

userSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		this.password = await bcrypt.hash(this.password, 10);
		console.log('Hashing new password');
	}
	next();
})

function noBlacklisterChars(params) {
	return /\W/.test(params) === false;
}


const User = mongoose.model('User', userSchema);

module.exports = User;