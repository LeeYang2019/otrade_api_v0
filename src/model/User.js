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
		image: {
			type: String,
			required: true,
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
		telephone: {
			type: String,
		},
		role: {
			type: String,
			enum: ['surveyor', 'client', 'admin'],
			default: 'surveyor',
		},
		avatar: {
			type: String,
		},
		status: {
			type: String,
			enum: ['active', 'inactive'],
			default: 'active',
		},
		password: {
			type: String,
			required: [true, 'Please add a password'],
			minlength: 6,
		},
		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
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

UserSchema.virtual('projects', {
	ref: 'Project',
	localField: '_id',
	foreignField: 'assignees',
	justOne: false,
});

module.exports = mongoose.model('User', UserSchema);
