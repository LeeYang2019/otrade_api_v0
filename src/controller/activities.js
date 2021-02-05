const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const mongoose = require('mongoose');

//import activity model
const model = require('../model/Activity');
const Activity = require('../model/Activity');

// @desc    POST an activity
// @route   POST /api/v1/project/:projectId/activities
// @access  Private
exports.addActivity = asyncHandler(async (req, res, next) => {
	req.body.user = req.user.id;
	req.body.project = req.params.projectId;
	const activity = await Activity.create(req.body);
	res.status(200).json({ success: true, data: activity });
});

// @desc    GET an activity
// @route   GET /api/v1/activities/:id
// @access  Private
exports.getActivity = asyncHandler(async (req, res, next) => {
	const activity = await Activity.findById(req.params.id);

	if (!activity) {
		res.status(401);
		throw new Error('No resources found');
	}

	res.status(200).json({ success: true, data: activity });
});

// @desc    PUT an activity
// @route   PUT /api/v1/activities/:id
// @access  Private
exports.updateActivity = asyncHandler(async (req, res, next) => {});

// @desc    DELETE an activity
// @route   DELETE /api/v1/activities/:id
// @access  Private
exports.deleteActivity = asyncHandler(async (req, res, next) => {});

// @desc    GET all activities
// @route   GET /api/v1/project/:projectId/activities
// @access  Private
exports.getActivities = asyncHandler(async (req, res, next) => {
	const keyword = req.query.keyword
		? { name: { $regex: req.query.keyword, $options: 'i' } }
		: {};

	const activities = await Activity.find({
		project: req.params.projectId,
		...keyword,
	}).sort({ name: 1 });

	if (!activities) {
		res.status(401);
		throw new Error('No resources found');
	}

	console.log('getActivities');

	res.status(200).json({ success: true, data: activities });
});

// @desc    GET all activities
// @route   GET /api/v1/stakeholder/:stakeholderId/activities
// @access  Private
exports.getStakeholderActivities = asyncHandler(async (req, res, next) => {
	const keyword = req.query.keyword
		? { name: { $regex: req.query.keyword, $options: 'i' } }
		: {};

	console.log('getStakeholderActivities');

	const activities = await Activity.find({
		stakeholders: mongoose.Types.ObjectId(req.params.stakeholderId),
		...keyword,
	});

	if (!activities) {
		res.status(401);
		throw new Error('No resources found');
	}

	console.log('getStakeholderActivities');

	res.status(200).json({ success: true, data: activities });
});
