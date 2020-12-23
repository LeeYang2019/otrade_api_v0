const mongoose = require('mongoose');

//define schema
const CommitmentSchema = mongoose.Schema(
	{
		details: {
			type: String,
			required: true,
		},
		completion_date: {
			type: Date,
			require: true,
		},
		// available documents
		// documents: [],
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
		timestamps: true,
	}
);

//export schema as model
module.exports = mongoose.Model('Commitment', CommitmentSchema);
