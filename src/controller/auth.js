const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');
const User = require('../model/User');

// @desc    Authenticate user
// @route   POST /api/v1/users/login
// @access  public
exports.authUser = asyncHandler(async (req, res) => {
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

// @desc    Register a new user
// @route   POST /api/v1/users
// @access  public
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

// @desc    GET user profile
// @route   GET /api/v1/users/profile
// @access  private
exports.getUserProfile = asyncHandler(async (req, res) => {
	//auth middleware passes user here
	const user = await User.findById(req.user._id);

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

// @desc    Update user profile
// @route   PUT /api/v1/users/profile
// @access  private
exports.updateUserProfile = asyncHandler(async (req, res) => {
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
