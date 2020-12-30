import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { listUsers } from '../actions/userActions';
import {
	assignProjectUser,
	listProjectDetails,
} from '../actions/projectActions';
import Message from '../components/Message';
import Loader from '../components/Loader';

const Assignment = ({ history, match }) => {
	const projectId = match.params.id;

	//set assigned users
	const [assignments, setAssignments] = useState([{ assignee: '' }]);
	const [message, setMessage] = useState(null);

	const dispatch = useDispatch();

	//get userList
	const userList = useSelector((state) => state.userList);
	const { loading, error, users } = userList;

	const projectDetails = useSelector((state) => state.projectDetails);
	const {
		loading: projectLoading,
		error: projectError,
		project,
	} = projectDetails;

	const projectUserAssignment = useSelector(
		(state) => state.projectUserAssignment
	);
	const { success } = projectUserAssignment;

	useEffect(() => {
		if (success) {
			dispatch(listProjectDetails(projectId));
		} else {
			if (!project.projectName || project._id !== projectId) {
				dispatch(listProjectDetails(projectId));
				dispatch(listUsers());
			} else {
				setAssignments(project.assignees);
			}
		}
	}, [dispatch, history, projectId, project, success]);

	const addHandler = () => {
		setAssignments([...assignments, { assignee: '' }]);
	};

	const removeHandler = (i) => {
		const removeItem = assignments[i];
		const list = assignments.filter((i) => i !== removeItem);
		setAssignments(list);
	};

	const handleInputChange = (e, i) => {
		e.preventDefault();
		const list = [...assignments];

		if (list.includes(e.target.value)) {
			setMessage(
				'Please make sure the same user is not assigned more than once.'
			);
		} else {
			list[i] = e.target.value;
			setAssignments(list);
			setMessage('');
		}
	};

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(assignProjectUser(projectId, assignments));
	};

	return (
		<>
			{message && <Message variant="danger">{message}</Message>}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Container>
					<Form onSubmit={submitHandler} className="my-5">
						<Form.Group>
							<h2>Project: {project.projectName}</h2>
							<Row className="pl-3">
								<Form.Label>Assign to</Form.Label>
							</Row>
							<Row>
								<Col md={12}>
									{assignments &&
										assignments.map((assignment, i) => (
											<Row className="mb-3">
												<Col md={7}>
													<Form.Control
														as="select"
														value={assignment.lastName}
														onChange={(e) => handleInputChange(e, i)}
														className="px-5"
													>
														<option value="">--Select Name--</option>
														{users.map((user) => (
															<option key={user._id} value={user._id}>
																{user.firstName} {user.lastName}
															</option>
														))}
													</Form.Control>
												</Col>
												<Col md={5}>
													{assignments.length !== 1 && (
														<Button
															variant="danger"
															className="btn-md mr-3"
															onClick={() => removeHandler(i)}
														>
															<i className="fas fa-trash"></i>
														</Button>
													)}
													{assignments.length - 1 === i && (
														<Button
															className="px-3"
															onClick={() => addHandler(i)}
														>
															<i className="fas fa-plus"></i> Add
														</Button>
													)}
												</Col>
											</Row>
										))}
								</Col>
							</Row>
						</Form.Group>
						<Row className="mt-3">
							<Col>
								<Button type="submit" variant="primary" className="px-5 mt-3">
									Update
								</Button>
							</Col>
						</Row>
					</Form>
				</Container>
			)}
		</>
	);
};

export default Assignment;
