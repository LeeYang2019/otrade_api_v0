const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');
const gravatar = require('gravatar');
const User = require('../model/User');
const Project = require('../model/Project');
const mongoose = require('mongoose');

/**
 * USER Routes
 */

// @desc    Authenticate user
// @route   POST /api/v1/users/login
// @access  public
exports.authMe = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	try {
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
	} catch (error) {
		res.status(500).json(error.message);
	}
});

// @desc    GET my user profile
// @route   GET /api/v1/users/profile
// @access  private
exports.getMyUserProfile = asyncHandler(async (req, res) => {
	try {
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
	} catch (error) {
		res.status(500).json(error.message);
	}
});

// @desc    Update my user profile
// @route   PUT /api/v1/users/profile
// @access  private
exports.updateMyUserProfile = asyncHandler(async (req, res) => {
	try {
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
	} catch (error) {
		res.status(500).json(error.message);
	}
});

/**
 * Admin User routes
 */

// @desc    Get all users
// @route   GET /api/v1/users
// @access  Private/admin
exports.getUsers = asyncHandler(async (req, res) => {
	try {
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
	} catch (error) {
		res.status(500).json(error.message);
	}
});

// @desc    Get a user
// @route   GET /api/v1/users/:id
// @access  Private/admin
exports.getUser = asyncHandler(async (req, res) => {
	try {
		const user = await User.findById(req.params.id);

		if (!user) {
			res.status(401);
			throw new Error('No resource found');
		}

		//return the user
		res.status(200).json({ success: true, data: user });
	} catch (error) {
		res.status(500).json(error.message);
	}
});

// @desc    Register a new user
// @route   POST /api/v1/users
// @access  private/admin
exports.registerUser = asyncHandler(async (req, res) => {
	const { email } = req.body;

	try {
		// lookup user with email
		const userExists = await User.findOne({ email });

		if (userExists) {
			res.status(404);
			throw new Error('User already exists');
		}

		req.body.user = req.user;

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
	} catch (error) {
		res.status(500).json(error.message);
	}
});

// @desc    Update a user
// @route   PUT /api/v1/admin/users/:id
// @access  Private/admin
exports.updateUser = asyncHandler(async (req, res) => {
	try {
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
	} catch (error) {
		res.status(500).json(error.message);
	}
});

// @desc    Delete a user
// @route   DELETE /api/v1/users/:id
// @access  Private/admin
exports.deleteUser = asyncHandler(async (req, res) => {
	await User.findByIdAndDelete(req.params.id);
	res.status(200).json({ success: true });
});

/**
 * USER Assignment Routes
 */

// @desc	Assign user to project
// @route	/api/v1/users/:id/projects/:projectId/assign
// @access	Private/admin
exports.assignUserToProject = async (req, res) => {
	//find user and project
	const user = await User.findById(req.params.id);
	const project = await Project.findById(req.params.projectId);

	//if neither are found throw an error
	if (!user || !project) {
		res.status(404);
		throw new Error('No Resources Found');
	}

	// if assignee array is empty, just push user onto assignee array, and save
	if (project.assignees.length === 0) {
		project.assignees.push(req.params.id);
		await project.save();
		res.status(200).json({ success: true, data: project });
	} else {
		// if assignee array not empty and user not assigned, push user onto array and save
		if (!project.assignees.includes(req.params.id)) {
			project.assignees.push(req.params.id);
			await project.save();
			res.status(200).json({ success: true, data: project });
		} else {
			//throw error
			res.status(401);
			throw new Error(
				`${user.firstName} has already been assigned to this project`
			);
		}
	}
};

// @desc	Remove user from project
// @route	/api/v1/users/:id/projects/:projectId/remove
// @access	private/admin
exports.removeUserFromProject = async (req, res) => {
	//find user and project
	const user = await User.findById(req.params.id);
	const project = await Project.findById(req.params.projectId);

	//if neither are found
	if (!user || !project) {
		res.status(404);
		throw new Error('No Resources Found');
	}

	//is user assigned to project?
	if (project.assignees.includes(req.params.id)) {
		//if array length is 1, set to empty array
		if (project.assignees.length === 1) {
			project.assignees = [];
		} else {
			// filter out user from array
			const newUpdate = project.assignees.filter(
				(item) => item != req.params.id
			);
			// set array
			project.assignees = newUpdate;
		}
	} else {
		res.status(404);
		throw new Error(`There are no assignments for ${user.firstName}`);
	}

	//save project
	await project.save();
	res.status(200).json({ success: true });
};
