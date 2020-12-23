const mongoose = require('mongoose');

// Define the schema
const ProjectSchema = new mongoose.Schema(
	{
		projectName: {
			type: String,
			required: [true, 'Please add a project name'],
		},
		projectClient: {
			type: String,
			required: [true, 'Please add a project client'],
		},
		status: {
			type: String,
			enum: ['open', 'closed'],
			default: 'open',
		},
		comment: {
			type: String,
		},
		assignees: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
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

// delete all stakeholders before deleting the project
ProjectSchema.pre('remove', async function (next) {
	await this.model('Stakeholder').deleteMany({ project: this._id });
	await this.model('Organization').deleteMany({ project: this._id });
	await this.model('Activity').deleteMany({ project: this._id });
});

// Exports
module.exports = mongoose.model('Project', ProjectSchema);
