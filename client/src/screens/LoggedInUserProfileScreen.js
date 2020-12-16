import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ProjectsScreen from './ProjectsScreen';
import Message from '../components/Message.js';
import Loader from '../components/Loader.js';
import { getUserDetails } from '../actions/userActions';

const LoggedInUserProfileScreen = ({ location, history }) => {
	const dispatch = useDispatch();

	// get user
	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	//get logged in user
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		if (!userInfo) {
			history.push('/login');
		} else {
			dispatch(getUserDetails(userInfo._id));
		}
	}, [history, dispatch, userInfo]);

	return (
		<Row>
			<Col md={4}>
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant="danger">{error}</Message>
				) : (
					<>
						<h2>Profile</h2>
						<p>
							Name: {user.firstName} {user.lastName}
						</p>
						<p>Email: {user.email}</p>
					</>
				)}
			</Col>
			<Col md={8}>
				<h2>Projects</h2>
				<ProjectsScreen userId={user._id} />
			</Col>
		</Row>
	);
};

export default LoggedInUserProfileScreen;
