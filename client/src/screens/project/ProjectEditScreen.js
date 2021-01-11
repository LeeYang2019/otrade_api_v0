import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
	listProjectDetails,
	updateProject,
} from '../../actions/projectActions';
import { PROJECT_UPDATE_RESET } from '../../constants/projectConstants';

const ProjectEditScreen = ({ match, history }) => {
	const projectId = match.params.id;

	const [projectName, setProjectName] = useState('');
	const [projectClient, setProjectClient] = useState('');
	const [comment, setComment] = useState('');
	const [status, setStatus] = useState('');
	const [updatedDate, setUpdatedDate] = useState('');

	// get product details
	const dispatch = useDispatch();

	//get projectDetails from reducer
	const projectDetails = useSelector((state) => state.projectDetails);
	const { loading, error, project } = projectDetails;

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
			dispatch(listProjectDetails(projectId));
			dispatch({ type: PROJECT_UPDATE_RESET });
		} else {
			if (!project.projectName || project._id !== projectId) {
				dispatch(listProjectDetails(projectId));
			} else {
				setProjectName(project.projectName);
				setProjectClient(project.projectClient);
				setComment(project.comment);
				setStatus(project.status);
				setUpdatedDate(project.updatedAt);
			}
		}
	}, [dispatch, history, projectId, project, successUpdate]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			updateProject({
				_id: projectId,
				projectName,
				projectClient,
				status,
				comment,
			})
		);
	};

	return (
		<>
			<Container className="mt-4">
				{loadingUpdate && <Loader />}
				{errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
				{successUpdate && <Message variant="success">Profile Updated</Message>}
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant="danger">{error}</Message>
				) : (
					<>
						<Form onSubmit={submitHandler}>
							<Row>
								<Col>
									<Form.Group controlId="projectName">
										<Form.Label>Project Name</Form.Label>
										<Form.Control
											type="projectName"
											placeholder="Enter a project name"
											value={projectName}
											required
											onChange={(e) => setProjectName(e.target.value)}
										></Form.Control>
									</Form.Group>
								</Col>
								<Col>
									<Form.Group controlId="projectClient">
										<Form.Label>Project Client</Form.Label>
										<Form.Control
											type="projectClient"
											placeholder="Enter a project client"
											value={projectClient}
											required
											onChange={(e) => setProjectClient(e.target.value)}
										></Form.Control>
									</Form.Group>
								</Col>
							</Row>
							<Row>
								<Col md={4}>
									<Form.Group controlId="status">
										<Form.Label>Status</Form.Label>
										<Form.Control
											as="select"
											value={status}
											required
											onChange={(e) => setStatus(e.target.value)}
										>
											<option value="open">open</option>
											<option value="closed">closed</option>
										</Form.Control>
									</Form.Group>
								</Col>
							</Row>
							<hr />
							<Row>
								<Col>
									<Form.Group controlId="comment">
										<Form.Label>Comments</Form.Label>
										<Form.Control
											as="textarea"
											rows="6"
											value={comment}
											required
											onChange={(e) => setComment(e.target.value)}
										></Form.Control>
									</Form.Group>
								</Col>
							</Row>
							<Row className="mt-3">
								<Col>
									<Button type="submit" variant="primary" className="px-5 mt-3">
										Update
									</Button>
								</Col>
								<Col className="text-right">
									<p>updated on: {updatedDate.substring(0, 10)}</p>
								</Col>
							</Row>
						</Form>
					</>
				)}
			</Container>
		</>
	);
};

export default ProjectEditScreen;
