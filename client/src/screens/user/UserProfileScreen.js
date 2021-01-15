import React, { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Card, Row, Col, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader.js';
import { getUserDetails } from '../../actions/userActions';

const UserProfileScreen = ({ history, match }) => {
	let userId = match.params.id;

	const dispatch = useDispatch();

	// get user
	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	useEffect(() => {
		if (!user.firstName || user._id !== userId) {
			dispatch(getUserDetails(userId));
		}
	}, [history, dispatch, userId, user]);

	return (
		<Row className="my-5">
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					<Col md={4}>
						<Card>
							<Card.Header>
								<h2>User Profile</h2>
							</Card.Header>
							<Card.Body>
								<p>
									<strong>Name: </strong>
									{user.firstName} {user.lastName} <br />
									<strong>Email: </strong>
									{user.email} <br />
									<strong>Telephone: </strong>
									{user.telephone}
									<br />
									<strong>Role: </strong>
									{user.role}
								</p>
							</Card.Body>
						</Card>
					</Col>
					<Col md={8}>
						<nav>
							<NavLink to={`/user/${userId}/edit`}>Edit Profile</NavLink>
						</nav>
					</Col>
				</>
			)}
		</Row>
	);
};

export default UserProfileScreen;
