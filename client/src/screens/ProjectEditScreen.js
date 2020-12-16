import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listProjectDetails, updateProject } from '../actions/projectActions';
import { listUsers } from '../actions/userActions';
import { PROJECT_UPDATE_RESET } from '../constants/projectConstants';

const ProjectEditScreen = ({ match, history }) => {
	const projectId = match.params.id;

	console.log(projectId);

	const [assignee, setAssignee] = useState('');

	const [projectName, setProjectName] = useState('');
	const [projectClient, setProjectClient] = useState('');

	// get product details
	const dispatch = useDispatch();

	//get projectDetails from reducer
	const projectDetails = useSelector((state) => state.projectDetails);
	const { loading, error, project } = projectDetails;

	const userList = useSelector((state) => state.userList);
	const { users } = userList;

	//get projectUpdate from reducer
	const projectUpdate = useSelector((state) => state.projectUpdate);
	const {
		success: successUpdate,
		loading: loadingUpdate,
		error: errorUpdate,
	} = projectUpdate;

	//useEffect
	useEffect(() => {
		if (successUpdate) {
			console.log('successful');
			dispatch({ type: PROJECT_UPDATE_RESET });
			history.push('/admin/projects');
		} else {
			if (!project.projectName || project._id !== projectId) {
				console.log(!project.projectName);
				console.log('project._id === projectId', project._id === projectId);
				console.log('dispatching');
				dispatch(listProjectDetails(projectId));
				dispatch(listUsers());
			} else {
				console.log('setting values');
				setProjectName(project.projectName);
				setProjectClient(project.projectClient);
			}
		}
	}, [dispatch, history, projectId, project, successUpdate]);

	const submitHandler = (e) => {
		e.preventDefault();
		console.log(assignee);
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
				{loadingUpdate && <Loader />}
				{errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
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
						<Form.Group className="my-5">
							<Form.Label>Assign to</Form.Label>
							<Form.Control
								as="select"
								value={assignee}
								onChange={(e) => setAssignee(e.target.value)}
							>
								{users.map((user) => (
									<option key={user._id} value={user._id}>
										{user.firstName} {user.lastName}
									</option>
								))}
							</Form.Control>
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
