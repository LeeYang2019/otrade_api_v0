const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');
const User = require('../model/User');

/**
 * USER Routes
 */

// @desc    Authenticate user
// @route   POST /api/v1/users/login
// @access  public
exports.authMe = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			role: user.role,
			token: generateToken(user._id),
		});
	} else {
		res.status(401); //unauthorized
		throw new Error('Invalid email or password');
	}
});

// @desc    GET my user profile
// @route   GET /api/v1/users/profile
// @access  private
exports.getMyUserProfile = asyncHandler(async (req, res) => {
	//auth middleware passes user here
	const user = await User.findById(req.user._id);

	console.log(user);

	//matches enteredPassword with db user password
	if (user) {
		res.json({
			_id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			role: user.role,
		});
	} else {
		res.status(401); //unauthorized
		throw new Error('Invalid email or password');
	}
});

// @desc    Update my user profile
// @route   PUT /api/v1/users/profile
// @access  private
exports.updateMyUserProfile = asyncHandler(async (req, res) => {
	//auth middleware passes user here
	const user = await User.findById(req.user._id);

	//matches enteredPassword with db user password
	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;

		if (req.body.password) {
			user.password = req.body.password;
		}

		const updatedUser = await user.save();

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
			token: generateToken(updatedUser._id),
		});
	} else {
		res.status(401); //unauthorized
		throw new Error('user not found');
	}
});

/**
 * Admin User routes
 */

// @desc    Get all users
// @route   GET /api/v1/users
// @access  Private/admin
exports.getUsers = asyncHandler(async (req, res) => {
	const users = await User.find().select('-password');
	res.status(200).json({ success: true, data: users });
});

// @desc    Get a user
// @route   GET /api/v1/users/:id
// @access  Private/admin
exports.getUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);
	res.status(200).json({ success: true, data: user });
});

// @desc    Register a new user
// @route   POST /api/v1/users
// @access  private/admin
exports.registerUser = asyncHandler(async (req, res) => {
	const { firstName, lastName, email, password } = req.body;

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error('User already exists');
	}

	const user = await User.create(req.body);

	if (user) {
		res.status(201).json({
			_id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			role: user.role,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('User not found');
	}
});

// @desc    Update a user
// @route   PUT /api/v1/admin/users/:id
// @access  Private/admin
exports.updateUser = asyncHandler(async (req, res) => {
	let user = await User.findById(req.params.id);
	user = await User.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});
	res.status(200).json({ success: true, data: user });
});

// @desc    Delete a user
// @route   DELETE /api/v1/users/:id
// @access  Private/admin
exports.deleteUser = asyncHandler(async (req, res) => {
	await User.findByIdAndDelete(req.params.id);
	res.status(200).json({ success: true, data: {} });
});
