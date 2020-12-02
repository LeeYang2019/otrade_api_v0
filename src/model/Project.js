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
		coordinates: {
			type: String,
		},
		// surveyors: [UserSchema],
	}
	// {
	// 	timestamps: true,
	// }
);

// delete all stakeholders before deleting the project
ProjectSchema.pre('remove', async function (next) {
	console.log(`stakeholders being removed from project ${this._id}`);
	await this.model('Stakeholder').deleteMany({ project: this._id });
});

// include stakeholders as a field in project
// ProjectSchema.virtual('stakeholders', {
// 	ref: 'Stakeholder',
// 	localField: '_id',
// 	foreignField: 'project',
// 	justOne: false,
// });

// Exports
module.exports = mongoose.model('Project', ProjectSchema);
