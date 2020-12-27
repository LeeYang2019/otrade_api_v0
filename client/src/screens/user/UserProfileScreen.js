import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { Tabs, Tab, Card, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ListProjectsScreen from './../project/ListProjectsScreen';
import Message from '../../components/Message';
import Loader from '../../components/Loader.js';
import { getUserDetails } from '../../actions/userActions';
import { USER_DETAILS_RESET } from '../../constants/userConstants';
import EditUserProfileScreen from './../user/EditUserProfileScreen';

const UserProfileScreen = ({ history, match }) => {
	let userId = match.params.id;

	const dispatch = useDispatch();

	// get user
	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	//get logged in user
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	console.log(user);
	console.log(userInfo);

	if (!userId) {
		userId = userInfo._id;
	}

	useEffect(() => {
		if (!userInfo) {
			history.push('/login');
		} else {
			if (!user || !user.firstName) {
				console.log('dispatch');
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
							<Card.Img
								src={
									user.firstName === 'Fabiano' &&
									'https://cdn-aloik.nitrocdn.com/huqEQAiBEvAuNBhDiOttdbmgrSMOWZHL/assets/static/optimized/otrade.ca/newsite/wp-content/uploads/2020/09/25a95d9509d5efaf4818a5e7dc080124.fabiano-bio-2.png'
								}
								alt="user profile"
								className="w-75 m-auto mt-5"
							/>
							<Card.Body>
								<hr />
								<Card.Text>
									<p>
										{user.firstName} {user.lastName}
									</p>
									{user.email}
									<br />
									{user.telephone}
									<br />
									{user.role}
								</Card.Text>
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
								<EditUserProfileScreen userId={userId} />
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
