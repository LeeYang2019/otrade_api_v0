import React, { useEffect } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { listProjectDetails } from '../../actions/projectActions';
import ProfileTop from '../../components/ProfileTop';
import { btnlinks, navbarlinks, routes } from './utilities';

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
					<ProfileTop
						url={url}
						path={path}
						profile={project}
						btnlinks={btnlinks}
						navbarlinks={navbarlinks}
					/>
					<Switch>
						{routes.map((item, index) => (
							<Route
								key={index}
								exact
								path={`${path}${item.path}`}
								render={item.component}
							/>
						))}
					</Switch>
				</>
			)}
		</>
	);
};

export default ProjectScreen;
