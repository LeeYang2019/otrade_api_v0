const mongoose = require('mongoose');

//define schema
const StakeholderSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: [true, 'Please enter a firstName'],
		},
		lastName: {
			type: String,
			required: [true, 'Please enter a lastName'],
		},
		gender: {
			type: String,
			require: [true, 'Please enter a gender'],
			enum: ['male', 'female', 'other'],
		},
		birthdate: {
			type: Date,
			required: false,
		},
		ethnicity: {
			type: String,
		},
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
		image: {
			type: String,
		},
		media: [
			{
				type: String,
			},
		],
		organization: {
			type: String,
			enum: ['yes', 'no'],
		},
		position: {
			type: String,
			enum: [
				'contrario',
				'activo',
				'contrario pasivo',
				'desconocido',
				'favorable activo',
				'favorable inactivo',
				'favorable con condiciones',
			],
		},
		influence: {
			type: String,
			enum: ['alto', 'muy alto', 'bajo', 'desconocido', 'medio'],
		},
		projImpact: {
			type: String,
			enum: ['alto', 'muy alto', 'bajo', 'desconocido', 'medio'],
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

// delete all associated coments before deleting the stakeholder
StakeholderSchema.pre('remove', async function (next) {
	console.log(`comments being removed from stakeholder ${this._id}`);
	//await this.model('Comment').deleteMany({ stakeholder: this._id });
	//remove activities associations
	//remove organizations associations
});

// populate stakeholders with activities, comments, organization
// StakeholderSchema.virtual('comments', {
// 	ref: 'Comment',
// 	localField: '_id',
// 	foreignField: 'stakeholder',
// 	justOne: false,
// });

//export schema as model
module.exports = mongoose.model('Stakeholder', StakeholderSchema);
