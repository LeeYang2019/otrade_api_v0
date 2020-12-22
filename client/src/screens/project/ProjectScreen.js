import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, Tab, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import ListStakeholdersScreen from './../stakeholder/ListStakeholdersScreen';
import ListOrganizationsScreen from './../organization/ListOrganizationsScreen';
import ListActivitiesScreen from './../activity/ListActivitiesScreen';
import ProjectDetailsScreen from './ProjectDetailsScreen';
import { listProjectDetails } from '../../actions/projectActions';

const ProjectScreen = ({ history, match }) => {
	const projectId = match.params.projectId;
	const userId = match.params.id;

	// get userDispatch
	const dispatch = useDispatch();

	//get project details
	const projectDetails = useSelector((state) => state.projectDetails);
	const { loading, error, project } = projectDetails;

	//get current user information
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		if (userInfo) {
			if (!project.projectName || project._id !== projectId) {
				dispatch(listProjectDetails(projectId));
			}
		} else {
			history.push('/login');
		}
	}, [dispatch, history, project, projectId, userInfo]);

	return (
		<>
			<Link to={`/profile/${userId}`} className="btn btn-primary my-3">
				Previous Page
			</Link>
			<Row>
				<Col md={4}>
					{loading ? (
						<Loader />
					) : error ? (
						<Message>{error}</Message>
					) : (
						<Card>
							<Card.Header>
								<h2>Project</h2>
							</Card.Header>
							<Card.Body>
								<p>Project: {project.projectName}</p>
								<p>Client: {project.projectClient}</p>
							</Card.Body>
						</Card>
					)}
				</Col>
				<Col md={8}>
					<Tabs defaultActiveKey="projectDetails" id="tabs" variant="tabs">
						<Tab eventKey="projectDetails" title="Project Details">
							<ProjectDetailsScreen projectId={projectId} />
						</Tab>
						<Tab eventKey="stakeholders" title="Stakeholders">
							<ListStakeholdersScreen projectId={projectId} />
						</Tab>
						<Tab eventKey="organizations" title="Organizations">
							<ListOrganizationsScreen projectId={projectId} />
						</Tab>
						<Tab eventKey="activities" title="Activities">
							<ListActivitiesScreen projectId={projectId} />
						</Tab>
					</Tabs>
				</Col>
			</Row>
		</>
	);
};

export default ProjectScreen;
