const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

//import project model
const Project = require('../model/Project');

// @desc    GET all projects
// @route   GET /api/v1/projects
// @access  Public
exports.getProjects = asyncHandler(async (req, res, next) => {
	// const projects = await Project.find();
	// res.status(200).json({ success: true, data: projects });
	res.status(200).json(res.advancedResults);
});

// @desc    GET a project
// @route   GET /api/v1/project/:id
// @access  Private
exports.getProject = asyncHandler(async (req, res, next) => {
	const project = await Project.findById(req.params.id);
	res.status(200).json({ success: true, data: project });
});

// @desc    POST a project
// @route   POST /api/v1/project
// @access  Public
exports.addProject = asyncHandler(async (req, res, next) => {
	const project = await Project.create(req.body);
	res.status(200).json({
		success: true,
		data: project,
	});
});

// @desc    PUT a project
// @route   PUT /api/v1/project/:id
// @access  Private
exports.updateProject = asyncHandler(async (req, res, next) => {
	let project = await Project.findById(req.params.id);
	project = await Project.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});
	res.status(200).json({ success: true, data: project });
});

// @desc    DELETE a project
// @route   DELETE /api/v1/project/:id
// @access  Private
exports.deleteProject = asyncHandler(async (req, res, next) => {
	await Project.findByIdAndDelete(req.params.id);
	res.status(200).json({ success: true, data: {} });
});
