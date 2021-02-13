const asyncHandler = require('express-async-handler');

// import stakeholder model
const Stakeholder = require('../model/Stakeholder');

// @desc    Get all stakeholders
// @route   GET /api/v1/projects/:projectId/stakeholders
// @access  Private
exports.getStakeholders = asyncHandler(async (req, res, next) => {
	const keyword = req.query.keyword
		? { lastName: { $regex: req.query.keyword, $options: 'i' } }
		: {};

	const stakeholders = await Stakeholder.find({
		project: req.params.projectId,
		...keyword,
	}).sort({ lastName: 1 });

	if (!stakeholders) {
		res.status(401);
		throw new Error('No resources found');
	}

	res.status(200).json({ success: true, data: stakeholders });
});

// @desc    Get a stakeholder
// @route   GET /api/v1/stakeholders/:id
// @access  Private
exports.getStakeholder = asyncHandler(async (req, res, next) => {
	// find stakeholder
	const stakeholder = await Stakeholder.findById(req.params.id);
	// if stakeholder does not exist
	if (!stakeholder) throw new Error('Stakeholder not found');
	// return stakeholder

	console.log(stakeholder);
	res.status(200).json({ success: true, data: stakeholder });
});

// @desc    Add a stakeholder
// @route   POST /api/v1/projects/:projectId/stakeholders
// @access  Private
exports.addStakeholder = asyncHandler(async (req, res, next) => {
	// get params and req.user
	req.body.project = req.params.projectId;
	req.body.user = req.user.id;

	// capitalize first and lastName
	req.body = this.capitalizeName(req.body);

	const stakeholder = await Stakeholder.create(req.body);

	res.status(200).json({ success: true, data: stakeholder });
});

// @desc    Update a stakeholder
// @route   PUT /api/v1/stakeholders/:id
// @access  Private
exports.updateStakeholder = asyncHandler(async (req, res, next) => {
	req.body.user = req.user.id;

	let stakeholder = await Stakeholder.findById(req.params.id);

	if (!stakeholder) throw new Error('Stakeholder not found');

	req.body = this.capitalizeName(req.body);

	stakeholder = await Stakeholder.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({ success: true, data: stakeholder });
});

// @desc    Delete a stakeholder
// @route   DELETE /api/v1/stakeholders/:id
// @access  Private
exports.deleteStakeholder = asyncHandler(async (req, res, next) => {
	await Stakeholder.findOneAndDelete(req.params.id);

	res.status(200).json({ success: true, data: {} });
});

exports.capitalizeName = (reqBody) => {
	// get req body and capitalize firstName
	const firstNameChar = reqBody.firstName[0].toUpperCase();
	const updatedFirstName =
		firstNameChar + reqBody.firstName.substring(1, reqBody.firstName.length);

	// capitalize lastName
	const lastNameChar = reqBody.lastName[0].toUpperCase();
	const updatedLastName =
		lastNameChar + reqBody.lastName.substring(1, reqBody.lastName.length);

	reqBody.firstName = updatedFirstName;
	reqBody.lastName = updatedLastName;

	return reqBody;
};
