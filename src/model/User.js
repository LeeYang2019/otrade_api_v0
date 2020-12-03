const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: [true, 'Please add a name'],
		},
		lastName: {
			type: String,
			required: [true, 'Please add a lastname'],
		},
		email: {
			type: String,
			required: [true, 'Please add an email'],
			unique: true,
			match: [
				/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
				'Please add a valid email',
			],
		},
		role: {
			type: String,
			enum: ['surveyor', 'client', 'admin'],
			default: 'surveyor',
		},
		password: {
			type: String,
			required: [true, 'Please add a password'],
			minlength: 6,
			// select: false, //makes this.password not accessible
		},
	},
	{
		timestamps: true,
	}
);

UserSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.pre('save', async function (next) {
	// if the password has not been modified, skip
	if (!this.isModified('password')) {
		next();
	}

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', UserSchema);
