const express = require('express');
const router = express.Router({ mergeParams: true });

//import Comment  controller functions
const {
	getComments,
	getComment,
	addComment,
	updateComment,
	deleteComment,
} = require('../controller/comments');

const Comment = require('../model/Comment');
const advancedResults = require('../middleware/advancedResuts');

router
	.route('/')
	.get(
		advancedResults(Comment, {
			path: 'stakeholder',
			select: 'comment, date',
		}),
		getComments
	)
	.post(addComment);

router.route('/:id').get(getComment).put(updateComment).delete(deleteComment);

//export router
module.exports = router;
