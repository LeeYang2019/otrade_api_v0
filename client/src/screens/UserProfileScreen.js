import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ProjectsScreen from './ProjectsScreen';
import Message from '../components/Message.js';
import Loader from '../components/Loader.js';
import { getUserDetails } from '../actions/userActions';

const UserProfileScreen = ({ location, history, match }) => {
	let userId = match.params.id;

	const dispatch = useDispatch();

	// get user
	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	//get logged in user
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	if (!userId) {
		userId = userInfo._id;
	}

	useEffect(() => {
		if (!userInfo) {
			history.push('/login');
		} else {
			dispatch(getUserDetails(userId));
		}
	}, [history, dispatch, userInfo, userId]);

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
						<p>Role: {user.role}</p>
					</>
				)}
			</Col>
			<Col md={8}>
				<h2>Projects</h2>
				<Route
					render={({ history }) => (
						<ProjectsScreen history={history} userId={user._id} />
					)}
				/>
			</Col>
		</Row>
	);
};

export default UserProfileScreen;
