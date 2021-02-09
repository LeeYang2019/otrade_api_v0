const mongoose = require('mongoose');

const LandownershipSchema = mongoose.Schema(
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
		timestamp: true,
	}
);

module.exports = mongoose.model('Landownership', LandownershipSchema);
