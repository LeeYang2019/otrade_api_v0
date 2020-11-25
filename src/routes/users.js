const express = require('express');
const router = express.Router();

//import user controller methods
const {
	getUsers,
	getUser,
	addUser,
	updateUser,
	deleteUser,
} = require('../controller/users');

//define general user route
router.route('/').get(getUsers).post(addUser);

//define specific user route
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

//export router
module.exports = router;
