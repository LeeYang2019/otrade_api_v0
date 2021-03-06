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

const { protect } = require('../middleware/auth');

//create router
const router = express.Router({ mergeParams: true });

//specific organization routes
router
	.route('/:id')
	.get(protect, getOrganization)
	.put(protect, updateOrganization)
	.delete(protect, deleteOrganization);

//export
module.exports = router;
