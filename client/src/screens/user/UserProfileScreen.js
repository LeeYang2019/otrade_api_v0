import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { Tabs, Tab, Card, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ListProjectsScreen from './../project/ListProjectsScreen';
import Message from '../../components/Message';
import Loader from '../../components/Loader.js';
import { getUserDetails } from '../../actions/userActions';
import EditUser from './../user/EditUser';

const UserProfileScreen = ({ history, match }) => {
	let userId = match.params.id;

	console.log(userId);

	const dispatch = useDispatch();

	//get logged in user
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	// get user
	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	if (!userId) {
		userId = userInfo._id;
	}

	useEffect(() => {
		if (!userInfo) {
			history.push('/login');
		} else {
			if (!user.firstName || user._id !== userId) {
				dispatch(getUserDetails(userId));
			}
		}
	}, [history, dispatch, userInfo, userId, user]);

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
						<Tabs
							defaultActiveKey="projects"
							id="tabs"
							variant="tabs"
							className=""
						>
							<Tab eventKey="userDetails" title="User Details">
								<Route
									render={({ history }) => (
										<EditUser history={history} userId={userId} />
									)}
								/>
							</Tab>
							<Tab eventKey="projects" title="Projects">
								<Route
									render={({ history }) => (
										<ListProjectsScreen history={history} userId={userId} />
									)}
								/>
							</Tab>
						</Tabs>
					</Col>
				</>
			)}
		</Row>
	);
};

export default UserProfileScreen;
