import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProjectDetails } from '../../actions/projectActions';
import Message from '../../components/Message.js';
import Loader from '../../components/Loader.js';
import BorderContainer from '../../components/BorderContainer';

const ProjectDetailsScreen = ({ history }) => {
	const dispatch = useDispatch();

	const projectDetails = useSelector((state) => state.projectDetails);
	const { loading, error, project } = projectDetails;

	useEffect(() => {
		dispatch(listProjectDetails(project._id));
		// eslint-disable-next-line
	}, []);

	return (
		<BorderContainer>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					<h3>Comments:</h3>
					<p>
						<strong>{project.comment}</strong>
					</p>
				</>
			)}
		</BorderContainer>
	);
};

export default ProjectDetailsScreen;
