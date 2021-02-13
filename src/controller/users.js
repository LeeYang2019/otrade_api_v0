const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');
const User = require('../model/User');
const Project = require('../model/Project');
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

/**
 * JOI userSchema
 */
const userSchema = Joi.object().keys({
	firstName: Joi.string().required(),
	lastName: Joi.string().required(),
	image: Joi.string().optional(),
	email: Joi.string().required(),
	telephone: Joi.string().optional(),
});

/**
 * USER Routes
 */

// @desc    Authenticate user
// @route   POST /api/v1/users/login
// @access  public
exports.authMe = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	//if the user exists and password matches, return the user
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

	//matches enteredPassword with db user password
	if (user) {
		res.json({
			_id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			telephone: user.telephone,
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
	req.body = this.capitalizeName(req.body);

	//auth middleware passes user here
	const user = await User.findById(req.user._id);

	//matches enteredPassword with db user password
	if (user) {
		user.firstName = req.body.firstName || user.firstName;
		user.lastName = req.body.lastName || user.lastName;
		user.telephone = req.body.telephone || user.telephone;
		user.image = req.body.image || user.image;
		user.email = req.body.email || user.email;

		if (req.body.password) {
			user.password = req.body.password;
		}

		const updatedUser = await user.save();

		res.json({
			_id: updatedUser._id,
			firstName: updatedUser.firstName,
			lastName: updatedUser.lastName,
			email: updatedUser.email,
			telephone: updatedUser.telephone,
			status: updatedUser.status,
			role: updatedUser.role,
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
	const pageSize = 5;
	const page = Number(req.query.pageNumber) || 1;

	const keyword = req.query.keyword
		? {
				lastName: {
					$regex: req.query.keyword,
					$options: 'i',
				},
		  }
		: {};

	const count = await User.countDocuments({ ...keyword });
	const users = await User.find({ ...keyword })
		.select('-password')
		.sort({ lastName: 1 })
		.limit(pageSize)
		.skip(pageSize * (page - 1));
	res.status(200).json({ users, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Get a user
// @route   GET /api/v1/users/:id
// @access  Private/admin
exports.getUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);

	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}

	//return the user
	res.status(200).json({ success: true, data: user });
});

// @desc    Register a new user
// @route   POST /api/v1/users
// @access  private/admin
exports.registerUser = asyncHandler(async (req, res) => {
	const { email } = req.body;

	// lookup user with email
	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(404);
		throw new Error('User already exists');
	}

	req.body.user = req.user;
	req.body = this.capitalizeName(req.body);

	//create user
	const user = await User.create(req.body);

	if (user) {
		res.status(201).json({
			_id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			image: user.image,
			role: user.role,
			status: user.status,
			token: generateToken(user._id),
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

// @desc    Update a user
// @route   PUT /api/v1/admin/users/:id
// @access  Private/admin
exports.updateUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);

	//matches enteredPassword with db user password
	if (user) {
		user.firstName = req.body.firstName || user.firstName;
		user.lastName = req.body.lastName || user.lastName;
		user.email = req.body.email || user.email;
		user.image = req.body.image || user.image;
		user.telephone = req.body.telephone || user.telephone;
		user.status = req.body.status || user.status;
		user.role = req.body.role || user.role;
		user.image = req.body.image || user.image;

		//save user
		const updatedUser = await user.save();
		res.status(201).json({ updatedUser });
	} else {
		res.status(401); //unauthorized
		throw new Error('user not found');
	}
});

// @desc    Delete a user
// @route   DELETE /api/v1/users/:id
// @access  Private/admin
exports.deleteUser = asyncHandler(async (req, res) => {
	//find user by id and delete
	await User.findByIdAndDelete(req.params.id);
	res.status(200).json({ success: true });
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
