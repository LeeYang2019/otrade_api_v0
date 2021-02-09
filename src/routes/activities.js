const express = require('express');

//bring in controller functions
const {
	getActivity,
	updateActivity,
	deleteActivity,
} = require('../controller/activities');

const { getCommitments, addCommitment } = require('../controller/commitments');

const { protect } = require('../middleware/auth');

//create router
const router = express.Router({ mergeParams: true });

// specific activities routes
router
	.route('/:id')
	.get(protect, getActivity)
	.put(protect, updateActivity)
	.delete(protect, deleteActivity);

// get activity commitments
router
	.route('/:activityId/commitments')
	.get(protect, getCommitments)
	.post(protect, addCommitment);

//export
module.exports = router;
