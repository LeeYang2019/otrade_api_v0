import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message.js';
import Loader from '../components/Loader.js';
import { getUserDetails } from '../actions/userActions';

const UserProfileScreen = ({ location, history }) => {
	// import dispatch and useSelector
	const dispatch = useDispatch();

	//call the userDetails reducer in the store
	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	console.log(user);

	//call the userLogin reducer in the store
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	// const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
	// const { success } = userUpdateProfile;

	useEffect(() => {
		if (!userInfo) {
			history.push('/login');
		} else {
			// //if user.name does not exist, fetch data
			// if (!user.name) {
			dispatch(getUserDetails('profile'));
			// }
		}
	}, []);

	return <div>User Profile</div>;
};

export default UserProfileScreen;
