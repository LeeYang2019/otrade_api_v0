import React, { useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import { Tabs, Tab, Card, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message.js';
import Loader from '../../components/Loader.js';
import { getStakeholderDetails } from '../../actions/stakeholderActions';
import EditStakeholderScreen from './EditStakeholderScreen';
import ListOrganizationsScreen from './../organization/ListOrganizationsScreen';
import ListActivitiesScreen from './../activity/ListActivitiesScreen';

const StakeholderScreen = ({ history, match }) => {
	let stakeholderId = match.params.id;
	let projectId = match.params.projectId;

	const dispatch = useDispatch();

	//get logged in user
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	//get stakeholder
	const stakeholderDetails = useSelector((state) => state.stakeholderDetails);
	const { loading, error, stakeholder } = stakeholderDetails;

	useEffect(() => {
		if (!userInfo) {
			history.push('/login');
		} else {
			dispatch(getStakeholderDetails(stakeholderId));
		}
	}, [dispatch, history, stakeholderId, userInfo]);

	console.log(stakeholder);

	return (
		<>
			<Link to={`/project/${projectId}`} className="btn btn-primary my-3">
				Previous Page
			</Link>
			<Row>
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
									Name: {stakeholder.firstName} {stakeholder.lastName}
								</p>
								<p>Email: {stakeholder.email}</p>
							</Card.Body>
						</Card>
					)}
				</Col>
				<Col md={8}>
					<Tabs
						defaultActiveKey="stakeholderDetails"
						id="tabs"
						variant="tabs"
						bg="primary"
					>
						<Tab eventKey="stakeholderDetails" title="Details">
							<Route
								render={({ history }) => (
									<EditStakeholderScreen
										history={history}
										proejctId={projectId}
										stakeholderId={stakeholderId}
									/>
								)}
							/>
						</Tab>
						<Tab eventKey="organizations" title="Organizations">
							<Route
								render={({ history }) => (
									<ListOrganizationsScreen
										history={history}
										projectId={projectId}
										stakeholderId={stakeholderId}
									/>
								)}
							/>
						</Tab>
						<Tab eventKey="activities" title="Activities">
							<Route
								render={({ history }) => (
									<ListActivitiesScreen
										history={history}
										projectId={projectId}
										stakeholderId={stakeholderId}
									/>
								)}
							/>
						</Tab>
					</Tabs>
				</Col>
			</Row>
		</>
	);
};

export default StakeholderScreen;
