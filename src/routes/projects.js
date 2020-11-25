const express = require('express');
const router = express.Router();

// import project controller methods
const {
	getProjects,
	getProject,
	addProject,
	updateProject,
	deleteProject,
} = require('../controller/projects');

const advancedResults = require('../middleware/advancedResuts');
const Project = require('../model/Project');

// import resource routers
const stakeholderRouter = require('./stakeholders');

router.use('/:projectId/stakeholders', stakeholderRouter);

// define select parameters to include in project results
const stakeHolderParams = advancedResults(Project, {
	path: 'stakeholders',
	select: '_id firstName lastName gender birthdate telephone',
});

// define general route
router.route('/').get(stakeHolderParams, getProjects).post(addProject);

// define specific route
router.route('/:id').get(getProject).put(updateProject).delete(deleteProject);

module.exports = router;
