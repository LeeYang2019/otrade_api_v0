import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listProjectDetails, updateProject } from '../actions/projectActions';

const ProjectEditScreen = ({ match, history }) => {
	const projectId = match.params.id;

	console.log(projectId);

	const [projectName, setProjectName] = useState('');
	const [projectClient, setProjectClient] = useState('');

	// get product details
	const dispatch = useDispatch();

	//get projectDetails from reducer
	const projectDetails = useSelector((state) => state.projectDetails);
	const { loading, error, project } = projectDetails;

	//get projectUpdate from reducer
	const projectUpdate = useSelector((state) => state.projectUpdate);

	//useEffect
	useEffect(() => {
		//if name is empty or ids do not match
		if (!project.projectName || projectId !== project._id) {
			dispatch(listProjectDetails(projectId));
		} else {
			setProjectName(project.projectName);
			setProjectClient(project.projectClient);
		}
	}, []);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			updateProject({
				_id: projectId,
				projectName,
				projectClient,
			})
		);
	};

	return (
		<>
			<Link to="/admin/projects" className="btn btn-dark my-3">
				Back to Project List
			</Link>
			<FormContainer>
				<h1>Edit Project</h1>
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant="danger">{error}</Message>
				) : (
					<Form onSubmit={submitHandler}>
						<Form.Group>
							<Form.Label>Project Name</Form.Label>
							<Form.Control
								type="projectName"
								placeholder="Enter a project name"
								value={projectName}
								onChange={(e) => setProjectName(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group>
							<Form.Label>Project Client</Form.Label>
							<Form.Control
								type="projectClient"
								placeholder="Enter a project client"
								value={projectClient}
								onChange={(e) => setProjectClient(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Button type="submit" variant="primary">
							Update
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	);
};

export default ProjectEditScreen;
