const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

//import commitment model
const Commitment = require('../model/Commitment');

//@desc     ADD a commitment
//@route    POST /api/v1/activities/:id/commitments
//@access   Private
exports.addCommitment = asyncHandler(async (req, res, next) => {
	req.body.activity = req.params.activityId;
	req.body.project = req.params.projectId;
	req.body.user = req.user.id;

	const commitment = await Commitment.create(req.body);
	res.status(200).json({ success: true, data: commitment });
});

//@desc     GET a commitment
//@route    GET /api/v1/commitments/:id
//@access   Private
exports.getCommitment = asyncHandler(async (req, res, next) => {
	// find commitment by id
	const commitment = await Commitment.findById(req.params.id);

	// check to see if commitment exists
	if (!commitment) {
		res.status(400);
		throw new Error('Commitment not found');
	}

	// return commitment
	res.status(200).json({ success: true, data: commitment });
});

//@desc     UPDATE a commitment
//@route    PUT /api/commitment/:id
//@access   Private
exports.updateCommitment = asyncHandler(async (req, res, next) => {
	// get commitment by id
	let commitment = await Commitment.findById(req.params.id);

	// check to see if exists
	if (!commitment) {
		res.status(401);
		throw new Error('Commitment not found');
	}

	// update commitment
	commitment = await Commitment.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	// return updated commitment
	res.status(200).json({ success: true, data: commitment });
});

//@desc     DELETE a commitment
//@route    DELETE /api/commitment/:id
//@access   Private
exports.deleteCommitment = asyncHandler(async (req, res, next) => {
	// find commitment by id
	const commitment = await Commitment.findById(req.params.id);

	// check to see if exists
	if (!commitment) {
		res.status(401);
		throw new Error('Commitment not found');
	}

	// delete commitment
	await commitment.deleteOne();

	// return success
	res.status(200).json({ success: true });
});

//@desc     GET all commitments
//@route    GET /api/activities/:id/commitments
//@access   Private
exports.getCommitments = asyncHandler(async (req, res, next) => {});
