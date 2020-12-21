import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message.js';
import Loader from '../../components/Loader.js';

const ProjectDetailsScreen = ({ projectId }) => {
	return (
		<>
			<h2>ProjectDetails</h2>
			<p>{projectId}</p>
		</>
	);
};

export default ProjectDetailsScreen;
