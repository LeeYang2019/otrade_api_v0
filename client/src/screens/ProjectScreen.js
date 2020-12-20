import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, Tab, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message.js';
import Loader from '../components/Loader.js';
import StakeholdersScreen from './StakeholdersScreen';
import OrganizationsScreen from './OrganizationsScreen';
import ActivitiesScreen from './ActivitiesScreen';
import { listProjectDetails } from '../actions/projectActions';

const ProjectScreen = ({ history, match }) => {
	const projectId = match.params.id;

	// get userDispatch
	const dispatch = useDispatch();

	//get project details
	const projectDetails = useSelector((state) => state.projectDetails);
	const { loading, error, project } = projectDetails;

	//get current user information
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		if (!project.projectName || project._id !== projectId) {
			dispatch(listProjectDetails(projectId));
		}
	}, [dispatch, project, projectId]);

	return (
		<>
			<Link to={`/project/${project._id}`} className="btn btn-dark my-3">
				Previous Page
			</Link>
			<Row>
				{loading ? (
					<Loader />
				) : error ? (
					<Message>{error}</Message>
				) : (
					<Col md={4}>
						<Card>
							<Card.Header>
								<h2>Project</h2>
							</Card.Header>
							<Card.Body>
								<p>Project: {project.projectName}</p>
								<p>Client: {project.projectClient}</p>
							</Card.Body>
						</Card>
					</Col>
				)}
				<Col md={8}>
					<Tabs defaultActiveKey="stakeholders" id="tabs" variant="tabs">
						<Tab eventKey="stakeholders" title="StakeHolders">
							<StakeholdersScreen projectId={projectId} />
						</Tab>
						<Tab eventKey="organizations" title="Organizations">
							<OrganizationsScreen projectId={projectId} />
						</Tab>
						<Tab eventKey="activities" title="Activities">
							<ActivitiesScreen projectId={projectId} />
						</Tab>
					</Tabs>
				</Col>
			</Row>
		</>
	);
};

export default ProjectScreen;
