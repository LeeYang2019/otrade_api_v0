const asyncHandler = require('express-async-handler');

// import stakeholder model
const Stakeholder = require('../model/Stakeholder');

// @desc    Get all stakeholders
// @route   GET /api/v1/projects/:projectId/stakeholders
// @access  Private
exports.getStakeholders = asyncHandler(async (req, res, next) => {
	const stakeholders = await Stakeholder.find({
		project: req.params.projectId,
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
	const stakeholder = await Stakeholder.findById(req.params.id);
	res.status(200).json({ success: true, data: stakeholder });
});

// @desc    Add a stakeholder
// @route   POST /api/v1/projects/:projectId/stakeholders
// @access  Private
exports.addStakeholder = asyncHandler(async (req, res, next) => {
	//get params and req.user
	req.body.project = req.params.projectId;
	req.body.user = req.user;

	const stakeholder = await Stakeholder.create(req.body);
	res.status(200).json({ success: true, data: stakeholder });
});

// @desc    Update a stakeholder
// @route   PUT /api/v1/stakeholders/:id
// @access  Private
exports.updateStakeholder = asyncHandler(async (req, res, next) => {
	let stakeholder = await Stakeholder.findById(req.params.id);
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
