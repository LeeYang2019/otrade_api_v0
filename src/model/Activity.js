const mongoose = require('mongoose');

//define schema
const ActivitySchema = mongoose.Schema(
	{
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
module.exports = mongoose.model('Activity', ActivitySchema);
