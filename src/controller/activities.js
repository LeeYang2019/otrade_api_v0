const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

//import activity model
const model = require('../model/Activity');
const Activity = require('../model/Activity');

// @desc    POST an activity
// @route   POST /api/v1/project/:projectId/activities
// @access  Private
exports.addActivity = async (req, res, next) => {
	req.body.user = req.user.id;
	req.body.project = req.params.projectId;

	console.log(req.body);

	const activity = await Activity.create(req.body);
	res.status(200).json({ success: true, data: activity });
};

// @desc    GET an activity
// @route   GET /api/v1/activities/:id
// @access  Private
exports.getActivity = async (req, res, next) => {
	const activity = await Activity.findById(req.params.id);

	if (!activity) {
		res.status(401);
		throw new Error('No resources found');
	}

	res.status(200).json({ success: true, data: activity });
};

// @desc    PUT an activity
// @route   PUT /api/v1/activities/:id
// @access  Private
exports.updateActivity = async (req, res, next) => {};

// @desc    DELETE an activity
// @route   DELETE /api/v1/activities/:id
// @access  Private
exports.deleteActivity = async (req, res, next) => {};

// @desc    GET all activities
// @route   GET /api/v1/project/:projectId/activities
// @access  Private
exports.getActivities = async (req, res, next) => {};
