import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { listUsers } from '../actions/userActions';
import {
	assignProjectUser,
	listProjectDetails,
} from '../actions/projectActions';
import { PROJECT_ASSIGNMENT_RESET } from '../constants/projectConstants';
import Message from '../components/Message';
import Loader from '../components/Loader';

const Assignment = ({ history, match }) => {
	const projectId = match.params.id;

	//set assigned users
	const [assignments, setAssignments] = useState([{ assignee: '' }]);
	const [message, setMessage] = useState(null);

	const dispatch = useDispatch();

	//get loggedin user
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	//get userList
	const userList = useSelector((state) => state.userList);
	const { loading, error, users } = userList;

	//get project
	const projectDetails = useSelector((state) => state.projectDetails);
	const {
		loading: projectLoading,
		error: projectError,
		project,
	} = projectDetails;

	//get success on assignment update
	const projectUserAssignment = useSelector(
		(state) => state.projectUserAssignment
	);
	const { success } = projectUserAssignment;

	useEffect(() => {
		//if user logs out
		if (!userInfo) {
			history.push('/login');
		} else {
			//if success true; initial value undefined
			if (success) {
				dispatch(listProjectDetails(projectId));
				//reset success to undefined; otherwise continous looping
				dispatch({ type: PROJECT_ASSIGNMENT_RESET });
			} else {
				// if projectName undefined; initial value undefined
				if (!project.projectName || project._id !== projectId) {
					dispatch(listProjectDetails(projectId));
					dispatch(listUsers());
				} else {
					if (project.assignees.length !== 0) {
						setAssignments(project.assignees);
					}
				}
			}
		}
	}, [dispatch, history, projectId, project, success, userInfo]);

	//add input field
	const addHandler = () => {
		setAssignments([...assignments, { assignee: '' }]);
	};

	//remove input field
	const removeHandler = (i) => {
		const removeUser = assignments[i];
		//filter out removeUser from current list and return new list
		const list = assignments.filter((i) => i !== removeUser);
		setAssignments(list);
	};

	//when option is selected
	const handleInputChange = (e, i) => {
		e.preventDefault();
		const list = [...assignments];

		//compare selected value with list values
		//if selected value included in list
		if (
			list.includes(e.target.value) ||
			list.some((item) => item._id === e.target.value)
		) {
			//create error message
			setMessage(
				'Please make sure the same user is not assigned more than once.'
			);
		} else {
			//set target to list at pos i
			list[i] = e.target.value;
			setAssignments(list);
			setMessage('');
		}
	};

	//submit form
	const submitHandler = (e) => {
		e.preventDefault();

		if (project.status === 'closed') {
			setMessage(
				'Project assingment cannot be updated as the status is closed.'
			);
		} else {
			console.log(assignments);
			dispatch(assignProjectUser(projectId, assignments));
		}
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
									{projectLoading ? (
										<Loader />
									) : projectError ? (
										<Message variant="danger">{projectError}</Message>
									) : (
										<>
											{assignments &&
												assignments.map((assignee, i) => (
													<Row className="mb-3">
														<Col md={7}>
															<Form.Control
																as="select"
																value={assignee._id}
																onChange={(e) => handleInputChange(e, i)}
																required
																className="px-5"
															>
																<option value="">--Select--</option>
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
																	<i className="fas fa-plus"></i> Assignee
																</Button>
															)}
														</Col>
													</Row>
												))}
										</>
									)}
								</Col>
							</Row>
						</Form.Group>
						<Row className="mt-3">
							<Col>
								<Button type="submit" variant="primary" className="px-5 mt-3">
									Assign
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
