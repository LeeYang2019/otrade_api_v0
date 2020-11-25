const mongoose = require('mongoose');

const CommunitySchema = mongoose.Schema({
	location: {
		type: String,
		required: true,
	},
	area_influence: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('Community', CommunitySchema);
