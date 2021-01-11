import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
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
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Container className="mt-3">
					<p>
						<strong>Project: </strong>
						{project.projectName}
						<br />
						<strong>Project Client: </strong>
						{project.projectClient}
						<br />
						<strong>Status: </strong>
						{project.status === 'open' ? (
							<strong>
								<em className="text-success">{project.status}</em>
							</strong>
						) : (
							<strong>
								<em className="text-danger">{project.status}</em>
							</strong>
						)}
						<br />
						<strong>Comment: </strong>
						{project.comment}
					</p>
				</Container>
			)}
		</>
	);
};

export default ProjectDetailsScreen;
