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

const { protect, isAdmin } = require('../middleware/auth');
const Project = require('../model/Project');

// import resource routers
const stakeholderRouter = require('./stakeholders');
const organizationRouter = require('./organization');
const activityRouter = require('./activities');

//use with stakeholder route
router.use('/:projectId/stakeholders', stakeholderRouter);

//use with organization route
router.use('/:projectId/organizations', organizationRouter);

//use with activity route
router.use('/:projectId/activities', activityRouter);

// define general route
router
	.route('/')
	.get(protect, isAdmin, getProjects)
	.post(protect, isAdmin, addProject);

// define specific route
router
	.route('/:id')
	.get(protect, getProject)
	.put(protect, updateProject)
	.delete(protect, deleteProject);

router.route('/:projectId/assign').put(protect, isAdmin, assignUserToProject);

// get a user's projects
router.route('/user/:id').get(protect, getUserProjects);

module.exports = router;
