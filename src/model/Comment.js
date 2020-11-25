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
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

//export schema as model
module.exports = mongoose.model('Comment', CommentSchema);
