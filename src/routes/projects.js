const express = require('express');
const router = express.Router({ mergeParams: true });

// import project controller methods
const {
	getProjects,
	getUserProjects,
	getProject,
	addProject,
	updateProject,
	deleteProject,
	assignUserToProject,
} = require('../controller/projects');

// import stakeholder controller methods
const {
	addStakeholder,
	getStakeholders,
} = require('../controller/stakeholders');

// import organization controller methods
const {
	getOrganizations,
	addOrganization,
} = require('../controller/organization');

// import activities controller methods
const { getActivities, addActivity } = require('../controller/activities');

// import authentication
const { protect, isAdmin } = require('../middleware/auth');

// general project route
router
	.route('/')
	.get(protect, isAdmin, getProjects)
	.post(protect, isAdmin, addProject);

// specific project route
router
	.route('/:id')
	.get(protect, getProject)
	.put(protect, updateProject)
	.delete(protect, deleteProject);

// get a user's projects
router.route('/user/:id').get(protect, getUserProjects);

// get a project's stakeholders
router
	.route('/:projectId/stakeholders')
	.get(protect, getStakeholders)
	.post(protect, addStakeholder);

// get a projects's organizations
router
	.route('/:projectId/organizations')
	.get(protect, getOrganizations)
	.post(protect, addOrganization);

// get a project's activities
router
	.route('/:projectId/activities')
	.get(protect, getActivities)
	.post(protect, addActivity);

// assign a user to a project
router.route('/:projectId/assign').put(protect, assignUserToProject);

module.exports = router;
