import React, { useEffect } from 'react';
import { Switch, Route, Link, useRouteMatch, NavLink } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import ListStakeholders from './../stakeholder/StakeholdersList';
import { listProjectDetails } from '../../actions/projectActions';
import Dashboard from '../../components/Dashboard';
import ListOrganizations from '../organization/ListOrganizations';
import ActivitiesList from '../activity/ActivitiesList';
import EditProjectPhoto from '../project/EditProjectPhoto';

const ProjectScreen = ({ match }) => {
	const projectId = match.params.id;

	const { url, path } = useRouteMatch();

	// get userDispatch
	const dispatch = useDispatch();

	//get project details
	const projectDetails = useSelector((state) => state.projectDetails);
	const { loading, error, project } = projectDetails;

	useEffect(() => {
		dispatch(listProjectDetails(projectId));
	}, [dispatch, projectId]);

	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					<Row>
						<Col md={2}>
							<img src={project.image} alt="profile" className="profile" />
						</Col>
						<Col md={10}>
							<Row>
								<Col>
									<h1>
										<strong>Project: {project.projectName}</strong>
									</h1>
								</Col>
							</Row>
							<Row>
								<Col>
									<strong>{project.projectClient}</strong>
									<br />
									<strong>Status: </strong>
									{project.status}
									<br />
									<strong>Location: </strong>
									<strong>In Development</strong>
								</Col>
								<Col md={2} className="d-flex justify-content-end">
									<Link to={`${url}/photo`} className="btn btn-primary my-3">
										<i className="fas fa-edit"></i> Photo
									</Link>
								</Col>
							</Row>
							<hr />
							<Row>
								<ul className="my-navbar">
									{/* <li>
										<NavLink to={`${url}/dashboard`}>Dashboard</NavLink>
									</li> */}
									<li>
										<NavLink to={`${url}/stakeholders`}>Stakeholders</NavLink>
									</li>
									<li>
										<NavLink to={`${url}/organizations`}>Organizations</NavLink>
									</li>
									<li>
										<NavLink to={`${url}/activities`}>Activities</NavLink>
									</li>
								</ul>
							</Row>
						</Col>
					</Row>
					<Container>
						<Switch>
							<Route
								exact
								path={path}
								render={({ match }) => <Dashboard match={match} />}
							/>
							<Route
								exact
								path={`${path}/dashboard`}
								render={({ match }) => <Dashboard match={match} />}
							/>
							<Route
								exact
								path={`${path}/activities`}
								render={({ match }) => <ActivitiesList match={match} />}
							/>
							<Route
								exact
								path={`${path}/organizations`}
								render={({ match }) => <ListOrganizations match={match} />}
							/>
							<Route
								exact
								path={`${path}/stakeholders`}
								render={({ match }) => <ListStakeholders match={match} />}
							/>
							<Route
								exact
								path={`${path}/photo`}
								render={({ match }) => <EditProjectPhoto match={match} />}
							/>
						</Switch>
					</Container>
				</>
			)}
		</>
	);
};

export default ProjectScreen;
