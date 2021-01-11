const express = require('express');

//import commitment controller functions
const {
	addCommitment,
	getCommitment,
	updateCommitment,
	deleteCommitment,
	getCommitments,
} = require('../controller/commitments');

const { protect, isAdmin } = require('../middleware/auth');

//create router
const router = express.Router({ mergeParams: true });

//use with activity route
router.route('/').get(protect, getCommitments).post(protect, addCommitment);

//specific organization routes
router
	.route('/:id')
	.get(protect, getCommitment)
	.put(protect, updateCommitment)
	.delete(protect, deleteCommitment);

//export
module.exports = router;
