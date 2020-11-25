const express = require('express');
const router = express.Router({ mergeParams: true });

// import stakeholder controller functions
const {
	getStakeholders,
	getStakeholder,
	addStakeholder,
	updateStakeholder,
	deleteStakeholder,
} = require('../controller/stakeholders');

const Stakeholder = require('../model/Stakeholder');
const advancedResults = require('../middleware/advancedResuts');

//import resource routers
const commentRouter = require('./comments');

router.use('/:stakeholderId/comments', commentRouter);

//define commentParams to include in stakeholder results
const commentParams = advancedResults(Stakeholder, {
	path: 'comments',
	select: '_id comment date',
});

// define general route
router.route('/').get(commentParams, getStakeholders).post(addStakeholder);

// define specific route
router
	.route('/:id')
	.get(getStakeholder)
	.put(updateStakeholder)
	.delete(deleteStakeholder);

// export router
module.exports = router;
