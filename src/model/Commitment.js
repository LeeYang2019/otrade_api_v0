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
		activity: {
			type: mongoose.Schema.ObjectId,
			ref: 'Activity',
			required: true,
		},
		stakeholders: [{ type: mongoose.Schema.ObjectId, ref: 'Stakeholder' }],
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
module.exports = mongoose.model('Commitment', CommitmentSchema);
