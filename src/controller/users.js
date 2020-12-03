const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('express-async-handler');

//import project model
const User = require('../model/User');

// @desc    Get all users
// @route   GET /api/v1/admin/users
// @access  Private
exports.getUsers = asyncHandler(async (req, res, next) => {
	const users = await User.find();
	res.status(200).json({ success: true, data: users });
});

// @desc    Get a user
// @route   GET /api/v1/admin/users/:id
// @access  Private
exports.getUser = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.params.id);
	res.status(200).json({ success: true, data: user });
});

// @desc    Add a user
// @route   POST /api/v1/admin/users
// @access  Private
exports.addUser = asyncHandler(async (req, res, next) => {
	const { email } = req.body;

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error('User already exists');
	}

	const user = await User.create(req.body);
	res.status(200).json({ success: true, data: user });
});

// @desc    Update a user
// @route   PUT /api/v1/users/:id
// @access  Private
exports.updateUser = asyncHandler(async (req, res, next) => {
	let user = await User.findById(req.params.id);
	user = await User.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});
	res.status(200).json({ success: true, data: user });
});

// @desc    Delete a user
// @route   DELETE /api/v1/users/:id
// @access  Private
exports.deleteUser = asyncHandler(async (req, res, next) => {
	await User.findByIdAndDelete(req.params.id);
	res.status(200).json({ success: true, data: {} });
});
