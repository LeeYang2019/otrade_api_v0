const mongoose = require('mongoose');

//define schema
const CommitmentSchema = mongoose.Schema({
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
});

//export schema as model
module.exports = mongoose.Model('Commitment', CommitmentSchema);
