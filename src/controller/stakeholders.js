const asyncHandler = require('express-async-handler');

// import stakeholder model
const Stakeholder = require('../model/Stakeholder');

// @desc    Get all stakeholders
// @route   GET /api/v1/projects/:projectId/stakeholders
// @access  Private
exports.getStakeholders = asyncHandler(async (req, res, next) => {
	const keyword = req.query.keyword
		? { lastName: { $regex: req.query.keyword, $options: 'i' } }
		: {};

	try {
		const stakeholders = await Stakeholder.find({
			project: req.params.projectId,
			...keyword,
		}).sort({ lastName: 1 });

		if (!stakeholders) {
			res.status(401);
			throw new Error('No resources found');
		}

		res.status(200).json({ success: true, data: stakeholders });
	} catch (error) {
		res.status(500).json(error.message);
	}
});

// @desc    Get a stakeholder
// @route   GET /api/v1/stakeholders/:id
// @access  Private
exports.getStakeholder = asyncHandler(async (req, res, next) => {
	try {
		const stakeholder = await Stakeholder.findById(req.params.id);

		if (!stakeholder) throw new Error('Stakeholder not found');

		res.status(200).json({ success: true, data: stakeholder });
	} catch (error) {
		if (error.message === 'Stakeholder not found') {
			res.status(401).json(error.message);
		} else {
			res.status(500).json(error.message);
		}
	}
});

// @desc    Add a stakeholder
// @route   POST /api/v1/projects/:projectId/stakeholders
// @access  Private
exports.addStakeholder = asyncHandler(async (req, res, next) => {
	//get params and req.user
	req.body.project = req.params.projectId;
	req.body.user = req.user.id;

	try {
		const stakeholder = await Stakeholder.create(req.body);
		res.status(200).json({ success: true, data: stakeholder });
	} catch (error) {
		res.status(500).json(error.message);
	}
});

// @desc    Update a stakeholder
// @route   PUT /api/v1/stakeholders/:id
// @access  Private
exports.updateStakeholder = asyncHandler(async (req, res, next) => {
	req.body.user = req.user.id;
	try {
		let stakeholder = await Stakeholder.findById(req.params.id);

		if (!stakeholder) throw new Error('Stakeholder not found');

		stakeholder = await Stakeholder.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		res.status(200).json({ success: true, data: stakeholder });
	} catch (error) {
		if (error.message === 'Stakeholder not found') {
			res.status(401).json(error.message);
		} else {
			res.status(500).json(error.message);
		}
	}
});

// @desc    Delete a stakeholder
// @route   DELETE /api/v1/stakeholders/:id
// @access  Private
exports.deleteStakeholder = asyncHandler(async (req, res, next) => {
	try {
		await Stakeholder.findOneAndDelete(req.params.id);
		res.status(200).json({ success: true, data: {} });
	} catch (error) {
		res.status(500).json(error.message);
	}
});
