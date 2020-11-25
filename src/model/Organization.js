const mongoose = require('mongoose');

//define schema
const OrganizationSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please add an organization name'],
	},
	political_division: {
		type: String,
		require: [true, 'Please enter a political division'],
		enum: ['Canton', 'Comunidad', 'Federacion', 'Parroquia', 'Provincia'],
	},
	address: {
		type: String,
		required: [true, 'Please add an address'],
	},
	// stakeholders: {},
	email: {
		type: String,
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			'Please add a valid email',
		],
	},
	telephone: {
		type: String,
		match: [
			/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
			/^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
			/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
		],
	},
	social: {
		youtube: {
			type: String,
		},
		twitter: {
			type: String,
		},
		facebook: {
			type: String,
		},
		linkedin: {
			type: String,
		},
	},
});

//export schema as model
module.exports = mongoose.model('Organization', OrganizationSchema);
