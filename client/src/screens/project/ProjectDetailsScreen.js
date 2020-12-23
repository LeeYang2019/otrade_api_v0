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
			<p>{project.projectName}</p>
			{/* {project &&
				project.assignees.map((a) => (
					<p>
						{a.firstName} {a.lastName}
					</p>
				))} */}
		</>
	);
};

export default ProjectDetailsScreen;
