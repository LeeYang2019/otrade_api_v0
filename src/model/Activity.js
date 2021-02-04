const mongoose = require('mongoose');

//define schema
const ActivitySchema = mongoose.Schema(
	{
		activity: {
			type: String,
			required: true,
			enum: [
				'consulta informal',
				'reunion formal',
				'asamblea en comunidad',
				'socializacion',
				'apoyo a geologia',
				'apoyo a la fundacion',
			],
		},
		date: {
			type: Date,
			min: '1900-01-01',
		},
		hours: {
			type: Number,
		},
		location: {
			type: String,
		},
		compromise: {
			type: String,
			enum: ['Yes', 'No'],
		},
		isComplete: {
			type: Boolean,
		},
		discussPoints: [
			{
				type: String,
			},
		],
		stakeholders: [
			{
				type: mongoose.Schema.ObjectId,
				ref: 'Stakeholder',
			},
		],
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
