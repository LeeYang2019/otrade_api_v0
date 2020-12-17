const express = require('express');
const router = express.Router();

// import project controller methods
const {
	getProjects,
	getUserProjects,
	getProject,
	addProject,
	updateProject,
	deleteProject,
} = require('../controller/projects');

const advancedResults = require('../middleware/advancedResuts');
const { protect, isAdmin } = require('../middleware/auth');
const Project = require('../model/Project');

// import resource routers
const stakeholderRouter = require('./stakeholders');

router.use('/:projectId/stakeholders', stakeholderRouter);

// define general route
router
	.route('/')
	.get(protect, isAdmin, getProjects)
	.post(protect, isAdmin, addProject);

// define specific route
router.route('/:id').get(getProject).put(updateProject).delete(deleteProject);

//
router.route('/user/:id').get(protect, getUserProjects);

module.exports = router;
