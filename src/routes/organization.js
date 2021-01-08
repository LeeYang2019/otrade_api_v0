const express = require('express');
const router = express.Router({ mergeParams: true });
const { protect, isAdmin } = require('../middleware/auth');

//import Organization controller functions
const {
	getOrganizations,
	getOrganization,
	addOrganization,
	updateOrganization,
	deleteOrganization,
} = require('../controller/organization');

//general route through project
router.route('/').get(protect, getOrganizations).post(protect, addOrganization);

//define specific route
router
	.route('/:id')
	.get(getOrganization)
	.put(updateOrganization)
	.delete(deleteOrganization);

module.exports = router;
