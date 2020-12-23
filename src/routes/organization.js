const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../middleware/auth');

//import Organization controller functions
const {
	getOrganizations,
	getOrganization,
	addOrganization,
	updateOrganization,
	deleteOrganization,
} = require('../controller/organization');

//define general route
router.route('/').get(getOrganizations).post(protect, addOrganization);

//define specific route
router
	.route('/:id')
	.get(getOrganization)
	.put(updateOrganization)
	.delete(deleteOrganization);

module.exports = router;
