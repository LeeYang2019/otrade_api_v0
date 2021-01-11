const express = require('express');

//bring in controller functions
const {
	getActivities,
	getActivity,
	addActivity,
	updateActivity,
	deleteActivity,
} = require('../controller/activities');

const { protect, isAdmin } = require('../middleware/auth');

//create router
const router = express.Router({ mergeParams: true });

//import resource routers
const commitmentRouter = require('./commitments');

//use with project route
router.route('/').get(protect, getActivities).post(protect, addActivity);

//define route with id
router
	.route('/:id')
	.get(protect, getActivity)
	.put(protect, updateActivity)
	.delete(protect, deleteActivity);

//export
module.exports = router;
