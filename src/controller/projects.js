const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const mongoose = require('mongoose');

//import project model
const Project = require('../model/Project');

// @desc    GET all projects
// @route   GET /api/v1/projects
// @access  private
exports.getProjects = asyncHandler(async (req, res) => {
	const keyword = req.query.keyword
		? {
				projectName: {
					$regex: req.query.keyword,
					$options: 'i',
				},
		  }
		: {};

	const projects = await Project.find({ ...keyword }).sort({ projectName: 1 });
	res.status(200).json(projects);
});

// @desc    GET all projects for a user
// @route   GET /api/v1/projects/user/:id
// @access  private
exports.getUserProjects = asyncHandler(async (req, res) => {
	const projects = await Project.find({
		assignees: mongoose.Types.ObjectId(req.params.id),
	});

	if (projects.length === 0) {
		res.status(404);
		throw new Error('Projects not found');
	}

	res.status(200).json(projects);
});

// @desc    GET a project
// @route   GET /api/v1/project/:id
// @access  Private
exports.getProject = asyncHandler(async (req, res) => {
	const project = await Project.findById(req.params.id);

	if (!project) {
		res.status(404);
		throw new Error('Project not found');
	}

	res.json(project);
});

// @desc    POST a project
// @route   POST /api/v1/project
// @access  Public
exports.addProject = asyncHandler(async (req, res) => {
	const project = await Project.create(req.body);
	res.status(200).json({
		success: true,
		data: project,
	});
});

// @desc    PUT a project
// @route   PUT /api/v1/project/:id
// @access  Private
exports.updateProject = asyncHandler(async (req, res) => {
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
exports.deleteProject = asyncHandler(async (req, res) => {
	await Project.findByIdAndDelete(req.params.id);
	res.status(200).json({ success: true, data: {} });
});
