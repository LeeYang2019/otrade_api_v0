const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// import comment model
const Comment = require('../model/Comment');

// @desc    GET all comments
// @route   GET /api/v1/stakeholders/:stakeholderId/comments
// @access  Private
exports.getComments = asyncHandler(async (req, res, next) => {
	console.log('hello');
	console.log(req.params.stakeholderId);
	// if stakeholder is provided
	if (req.params.stakeholderId) {
		const comments = await Comment.find({
			stakeholder: req.params.stakeholderId,
		});
		res
			.status(200)
			.json({ success: true, count: comments.length, data: comments });
	} else {
		res.status(200).json(res.advancedResults);
	}
});

// @desc    GET a comment
// @route   GET /api/v1/comments/:id
// @access  Private
exports.getComment = asyncHandler(async (req, res, next) => {
	const comments = await Comment.findById(req.params.id);
	res.status(200).json({ success: true, data: comments });
});

// @desc    Add a comment
// @route   POST /api/v1/stakeholders/:stakeholderId/comments
// @access  Private
exports.addComment = asyncHandler(async (req, res, next) => {
	//get stakeholder and user
	req.body.stakeholder = req.params.stakeholderId;
	req.body.user = req.user.id;

	console.log(req.body);

	const comment = await Comment.create(req.body);
	res.status(200).json({ success: true, data: comment });
});

// @desc    Update a comment
// @route   PUT /api/v1/comments/:id
// @access  Private
exports.updateComment = asyncHandler(async (req, res, next) => {
	let comment = await Comment.findById(req.params.id);
	comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});
	res.status(200).json({ success: true, data: comment });
});

// @desc    Delete a comment
// @route   DELETE /api/v1/comments/:id
// @access  Private
exports.deleteComment = asyncHandler(async (req, res, next) => {
	await Comment.findByIdAndDelete(req.params.id);
	res.status(200).josn({ success: true, data: {} });
});
