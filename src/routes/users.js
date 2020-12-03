const express = require('express');
const router = express.Router();

//import user controller methods
const {
	getUsers,
	getUser,
	updateUser,
	deleteUser,
} = require('../controller/users');

const {
	authUser,
	getUserProfile,
	registerUser,
	updateUserProfile,
} = require('../controller/auth');

router.route('/login').post(authUser);
router.route('/profile').get(getUserProfile).put(updateUserProfile);

//define general user route
router.route('/').get(getUsers).post(registerUser);

//define specific user route
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

//export router
module.exports = router;
