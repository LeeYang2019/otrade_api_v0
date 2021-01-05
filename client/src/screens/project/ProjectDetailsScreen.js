import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProjectDetails } from '../../actions/projectActions';
import Message from '../../components/Message.js';
import Loader from '../../components/Loader.js';

const ProjectDetailsScreen = ({ history, projectId }) => {
	const dispatch = useDispatch();

	const projectDetails = useSelector((state) => state.projectDetails);
	const { loading, error, project } = projectDetails;

	console.log(project);

	useEffect(() => {
		dispatch(listProjectDetails(projectId));
	}, [dispatch, projectId]);

	return (
		<>
			<h2>ProjectDetails</h2>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					<p>{project.projectName}</p>
					<p>{project.projectClient}</p>
					<p>{project.status}</p>
					<p>{project.comment}</p>
				</>
			)}
		</>
	);
};

export default ProjectDetailsScreen;
