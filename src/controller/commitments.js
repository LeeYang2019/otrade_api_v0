const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

//import commitment model
const Commitment = require('../model/Commitment');

//@desc     ADD a commitment
//@route    POST /api/v1/activities/:id/commitments
//@access   Private
exports.addCommitment = asyncHandler(async (req, res, next) => {
	const commitment = await Commitment.create(req.body);
	res.status(200).json({ success: true, data: commitment });
});

//@desc     GET a commitment
//@route    GET /api/v1/commitments/:id
//@access   Private
exports.getCommitment = asyncHandler(async (req, res, next) => {
	const commitment = await Commitment.findById(req.params.id);
	res.status(200).json({ success: true, data: commitment });
});

//@desc     UPDATE a commitment
//@route    PUT /api/commitment/:id
//@access   Private
exports.updateCommitment = asyncHandler(async (req, res, next) => {});

//@desc     DELETE a commitment
//@route    DELETE /api/commitment/:id
//@access   Private
exports.deleteCommitment = asyncHandler(async (req, res, next) => {});

//@desc     GET all commitments
//@route    GET /api/activities/:id/commitments
//@access   Private
exports.getCommitments = asyncHandler(async (req, res, next) => {});
