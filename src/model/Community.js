const mongoose = require('mongoose');

const CommunitySchema = mongoose.Schema(
	{
		location: {
			type: String,
			required: true,
		},
		area_influence: {
			type: String,
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
		timestamps: true,
	}
);

module.exports = mongoose.model('Community', CommunitySchema);
