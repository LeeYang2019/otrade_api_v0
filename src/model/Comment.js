const mongoose = require('mongoose');

//define schema
const CommentSchema = mongoose.Schema(
	{
		comment: {
			type: String,
		},
		stakeholder: {
			type: mongoose.Schema.ObjectId,
			ref: 'Stakeholder',
			required: true,
		},
		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

//export schema as model
module.exports = mongoose.model('Comment', CommentSchema);
