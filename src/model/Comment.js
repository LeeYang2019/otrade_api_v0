const mongoose = require('mongoose');

//define schema
const CommentSchema = mongoose.Schema(
	{
		comment: {
			type: String,
		},
		date: {
			type: Date,
			default: Date.now,
		},
		stakeholder: {
			type: mongoose.Schema.ObjectId,
			ref: 'Stakeholder',
			required: true,
		},
		project: {
			type: mongoose.Schema.ObjectId,
			ref: 'Project',
			required: true,
		},
		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

//export schema as model
module.exports = mongoose.model('Comment', CommentSchema);
