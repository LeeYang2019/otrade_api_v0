const express = require('express');
const router = express.Router();

//import Organization controller functions
const {
	getOrganizations,
	getOrganization,
	addOrganization,
	updateOrganization,
	deleteOrganization,
} = require('../controller/organization');

//define general route
router.route('/').get(getOrganizations).post(addOrganization);

//define specific route
router
	.route('/:id')
	.get(getOrganization)
	.put(updateOrganization)
	.delete(deleteOrganization);

module.exports = router;
