const express = require('express');

// import stakeholder controller functions
const {
	getStakeholders,
	getStakeholder,
	addStakeholder,
	updateStakeholder,
	deleteStakeholder,
} = require('../controller/stakeholders');

const { getStakeholderOrganizations } = require('../controller/organization');

const { protect, isAdmin } = require('../middleware/auth');

//create router
const router = express.Router({ mergeParams: true });

//import resource routers
const commentRouter = require('./comments');
const organizationRouter = require('./organization');
const activityRouter = require('./activities');

//use with comment routes
router.use('/:stakeholderId/comments', commentRouter);

// use with project route
router.route('/').get(protect, getStakeholders).post(protect, addStakeholder);

// speicific stakeholder routes
router
	.route('/:id')
	.get(protect, getStakeholder)
	.put(protect, updateStakeholder)
	.delete(protect, isAdmin, deleteStakeholder);

//get stakeholder organizations
router.route('/:id/organizations').get(protect, getStakeholderOrganizations);

//get stakeholder activities
// router.route('/:id/activities').get(protect, getStakeholderActivities);

// export router
module.exports = router;
