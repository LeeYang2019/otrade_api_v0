const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../middleware/auth');

//import user controller methods
const {
	authMe,
	getMyUserProfile,
	updateMyUserProfile,
	getUsers,
	getUser,
	registerUser,
	updateUser,
	deleteUser,
} = require('../controller/users');

//define general user route
router.route('/').get(protect, isAdmin, getUsers).post(registerUser);
router.route('/login').post(authMe);

//protected profile routes
router
	.route('/profile')
	.get(protect, getMyUserProfile)
	.put(protect, updateMyUserProfile);

//admin protected routes
router
	.route('/:id')
	.get(protect, isAdmin, getUser)
	.put(protect, isAdmin, updateUser)
	.delete(protect, isAdmin, deleteUser);

//export router
module.exports = router;
