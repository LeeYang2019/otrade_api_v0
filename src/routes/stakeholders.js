const express = require('express');
const router = express.Router({ mergeParams: true });
const { protect, isAdmin } = require('../middleware/auth');

// import stakeholder controller functions
const {
	getStakeholders,
	getStakeholder,
	addStakeholder,
	updateStakeholder,
	deleteStakeholder,
} = require('../controller/stakeholders');

const Stakeholder = require('../model/Stakeholder');
const advancedResults = require('../middleware/advancedResuts');

//import resource routers
const commentRouter = require('./comments');

router.use('/:stakeholderId/comments', commentRouter);

// general route through project
router.route('/').get(protect, getStakeholders).post(protect, addStakeholder);

// define specific route
router
	.route('/:id')
	.get(protect, getStakeholder)
	.put(protect, updateStakeholder)
	.delete(protect, isAdmin, deleteStakeholder);

// export router
module.exports = router;
