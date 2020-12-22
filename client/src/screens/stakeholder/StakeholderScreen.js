import React, { useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import { Tabs, Tab, Card, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message.js';
import Loader from '../../components/Loader.js';
import EditStakeholderScreen from './EditStakeholderScreen';
import CommentsScreen from '../CommentsScreen';

const StakeholderScreen = ({ location, history, match }) => {
	let userId = match.params.id;

	// const dispatch = useDispatch();

	// // get user
	// const userDetails = useSelector((state) => state.userDetails);
	// const { loading, error, user } = userDetails;

	//get logged in user
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	// if (!userId) {
	// 	userId = userInfo._id;
	// }

	useEffect(() => {
		if (userInfo) {
		} else {
			history.push('/login');
		}
	}, [history, userInfo, userId]);

	return (
		<>
			<Link to={`/project/`} className="btn btn-primary my-3">
				Previous Page
			</Link>
			<Row>
				<Col md={4}>
					{/* {loading ? (
					<Loader />
				) : error ? (
					<Message variant="danger">{error}</Message>
				) : ( */}
					<Card>
						<Card.Header>
							<h2>Profile</h2>
						</Card.Header>
						<Card.Body>
							{/* <p>
							Name: {user.firstName} {user.lastName}
						</p>
						<p>Email: {user.email}</p>
						<p>Role: {user.role}</p> */}
						</Card.Body>
					</Card>
					{/* )} */}
				</Col>
				<Col md={8}>
					<Tabs
						defaultActiveKey="stakeholderDetails"
						id="tabs"
						variant="tabs"
						bg="primary"
					>
						<Tab eventKey="stakeholderDetails" title="Details">
							<EditStakeholderScreen />
						</Tab>
						<Tab eventKey="comments" title="Comments">
							<CommentsScreen />
						</Tab>
					</Tabs>
				</Col>
			</Row>
		</>
	);
};

export default StakeholderScreen;
