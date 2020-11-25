const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

//import Organization model
const Organization = require('../model/Organization');

// @desc    GET all organizations
// @route   GET /api/v1/organizations
// @access  Private
exports.getOrganizations = asyncHandler(async (req, res, next) => {
	const organizations = await Organization.find();
	res
		.status(200)
		.json({ success: true, count: organizations.length, data: organizations });
});

// @desc    GET an organization
// @route   GET /api/v1/organizations/:id
// @access  Public
exports.getOrganization = asyncHandler(async (req, res, next) => {
	const organization = await Organization.findById(req.params.id);
	res.status(200).json({ success: true, data: organization });
});

// @desc    Add an organization
// @route   POST /api/v1/organizations
// @access  Public
exports.addOrganization = asyncHandler(async (req, res, next) => {
	console.log(req.body);
	const organization = await Organization.create(req.body);
	res.status(200).json({ success: true, data: organization });
});

// @desc    Update an organization
// @route   PUT /api/v1/organizations/:id
// @access  Private
exports.updateOrganization = asyncHandler(async (req, res, next) => {
	let organization = await Organization.findById(req.params.id);
	organization = await Organization.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({ success: true, data: organization });
});

// @desc    Delete an organization
// @route   DELETE /api/v1/organizations/:id
// @access  Private
exports.deleteOrganization = asyncHandler(async (req, res, next) => {
	await Organization.findByIdAndDelete(req.params.id);
	res.status(200).json({ success: true, data: {} });
});
