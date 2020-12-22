import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { Tabs, Tab, Card, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ListProjectsScreen from './../project/ListProjectsScreen';
import Message from '../../components/Message';
import Loader from '../../components/Loader.js';
import { getUserDetails } from '../../actions/userActions';
import EditUserProfileScreen from './../user/EditUserProfileScreen';

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
		<Row className="my-5">
			<Col md={4}>
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant="danger">{error}</Message>
				) : (
					<Card>
						<Card.Header>
							<h2>Profile</h2>
						</Card.Header>
						<Card.Body>
							<p>
								<strong>Name: </strong>{' '}
								<em>
									{user.firstName} {user.lastName}
								</em>
								<br />
								<strong>Email: </strong> <em>{user.email}</em>
								<br />
								<strong>Role: </strong> <em>{user.role}</em>
							</p>
						</Card.Body>
					</Card>
				)}
			</Col>
			<Col md={8}>
				<Tabs defaultActiveKey="projects" id="tabs" variant="tabs" className="">
					<Tab eventKey="userDetails" title="User Details">
						<EditUserProfileScreen userId={user._id} />
					</Tab>
					<Tab eventKey="projects" title="Projects">
						<Route
							render={({ history }) => (
								<ListProjectsScreen history={history} userId={user._id} />
							)}
						/>
					</Tab>
				</Tabs>
			</Col>
		</Row>
	);
};

export default UserProfileScreen;
