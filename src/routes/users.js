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
	assignUserToProject,
	removeUserFromProject,
} = require('../controller/users');

//define general user route
router
	.route('/')
	.get(protect, isAdmin, getUsers)
	.post(protect, isAdmin, registerUser);
router.route('/login').post(authMe);

//protected profile routes
router
	.route('/profile')
	.get(protect, getMyUserProfile)
	.put(protect, updateMyUserProfile);

//admin protected routes
router
	.route('/:id')
	.get(protect, getUser)
	.put(protect, isAdmin, updateUser)
	.delete(protect, isAdmin, deleteUser);

//assignment user routes
router.route('/:id/projects/:projectId/assign').put(assignUserToProject);
router.route('/:id/projects/:projectId/remove').put(removeUserFromProject);

//export router
module.exports = router;
