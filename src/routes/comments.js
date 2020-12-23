const express = require('express');
const router = express.Router({ mergeParams: true });
const { protect, isAdmin } = require('../middleware/auth');

//import Comment  controller functions
const {
	getComments,
	getComment,
	addComment,
	updateComment,
	deleteComment,
} = require('../controller/comments');

const Comment = require('../model/Comment');

router.route('/').get(protect, getComments).post(protect, addComment);

router
	.route('/:id')
	.get(protect, getComment)
	.put(protect, updateComment)
	.delete(protect, deleteComment);

//export router
module.exports = router;
