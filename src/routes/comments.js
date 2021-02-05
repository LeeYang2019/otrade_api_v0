const express = require('express');
const router = express.Router({ mergeParams: true });
const { protect } = require('../middleware/auth');

// import Comment  controller functions
const {
	getComment,
	updateComment,
	deleteComment,
} = require('../controller/comments');

// general comment route
router
	.route('/:id')
	.get(protect, getComment)
	.put(protect, updateComment)
	.delete(protect, deleteComment);

//export router
module.exports = router;
