const express = require('express');

// import stakeholder controller functions
const {
	getStakeholders,
	getStakeholder,
	addStakeholder,
	updateStakeholder,
	deleteStakeholder,
} = require('../controller/stakeholders');

const { protect, isAdmin } = require('../middleware/auth');

//create router
const router = express.Router({ mergeParams: true });

//import resource routers
const commentRouter = require('./comments');

//use with stakeholder route
router.use('/:stakeholderId/comments', commentRouter);

// use with project route
router.route('/').get(protect, getStakeholders).post(protect, addStakeholder);

// speicific stakeholder routes
router
	.route('/:id')
	.get(protect, getStakeholder)
	.put(protect, updateStakeholder)
	.delete(protect, isAdmin, deleteStakeholder);

// export router
module.exports = router;
