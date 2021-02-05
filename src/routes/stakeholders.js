const express = require('express');

// import stakeholder controller functions
const {
	getStakeholder,
	updateStakeholder,
	deleteStakeholder,
} = require('../controller/stakeholders');

//	import organization controller functions
const { getStakeholderOrganizations } = require('../controller/organization');

// import activity controller functions
const { getStakeholderActivities } = require('../controller/activities');

// import comment controller functions
const { getComments, addComment } = require('../controller/comments');

// import authentication
const { protect, isAdmin } = require('../middleware/auth');

// create router
const router = express.Router({ mergeParams: true });

// specific stakeholder routes
router
	.route('/:id')
	.get(protect, getStakeholder)
	.put(protect, updateStakeholder)
	.delete(protect, isAdmin, deleteStakeholder);

// get stakeholder organizations
router.route('/:id/organizations').get(protect, getStakeholderOrganizations);

// get stakeholder activities
router.route('/:id/activities').get(protect, getStakeholderActivities);

// get stakeholder comments
router
	.route('/:stakeholderId/comments')
	.get(protect, getComments)
	.post(protect, addComment);

// export router
module.exports = router;
