const express = require('express');

//import Organization controller functions
const {
	getOrganizations,
	getStakeholderOrganizations,
	getOrganization,
	addOrganization,
	updateOrganization,
	deleteOrganization,
} = require('../controller/organization');

const { protect, isAdmin } = require('../middleware/auth');

//create router
const router = express.Router({ mergeParams: true });

//use with project route
///api/v1/
router
	.route('/')

	///api/v1/projects/:projectId/organizations
	//.get(protect, getOrganizations)

	///api/v1/stakeholders/:stakeholderId/organizations
	.get(protect, getStakeholderOrganizations)
	.post(protect, addOrganization);

//specific organization routes
router
	.route('/:id')
	.get(protect, getOrganization)
	.put(protect, updateOrganization)
	.delete(protect, deleteOrganization);

//export
module.exports = router;
