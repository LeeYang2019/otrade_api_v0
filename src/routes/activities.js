//bring in express
const express = require('express');

//bring in controller functions
const {
	getActivities,
	getActivity,
	addActivity,
	updateActivity,
	deleteActivity,
} = require('../controller/activities');

//create router
const router = express.Router();

//define general route
router.route('/').get(getActivities).post(addActivity);

//define route with id
router
	.route('/:id')
	.get(getActivity)
	.put(updateActivity)
	.delete(deleteActivity);

//export
module.exports = router;
