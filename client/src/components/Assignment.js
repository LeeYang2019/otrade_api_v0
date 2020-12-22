import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Table, Row } from 'react-bootstrap';
import { listUsers } from '../actions/userActions';
import {
	assignProjectUser,
	listProjectDetails,
	updateProject,
} from '../actions/projectActions';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { PROJECT_ASSIGNMENT_RESET } from '../constants/projectConstants';

const Assignment = ({ match }) => {
	const projectId = match.params.id;

	console.log(projectId);

	const [assignee, setAssignee] = useState('');

	const dispatch = useDispatch();

	// get list of all users for select menu
	const userList = useSelector((state) => state.userList);
	const { loading, error, users } = userList;

	// get the assigned users of a project
	const projectUserAssignment = useSelector(
		(state) => state.projectUserAssignment
	);
	const { success } = projectUserAssignment;

	//get projectDetails from reducer
	const projectDetails = useSelector((state) => state.projectDetails);
	const {
		loading: projectLoading,
		error: projectError,
		project,
	} = projectDetails;

	console.log('project', project);
	console.log('success', success);

	useEffect(() => {
		if (success) {
			console.log('success: ', success);
			dispatch(listProjectDetails(projectId));

			//reseting this will reset success to undefined/false
			dispatch({ type: PROJECT_ASSIGNMENT_RESET });
		} else {
			if (!project.projectName || project._id !== projectId) {
				dispatch(listProjectDetails(projectId));
			}
		}
	}, [dispatch, project, projectId, success]);

	//dispatch, project, projectId, success

	const submitHandler = (e) => {
		e.preventDefault();
		console.log(assignee);
		dispatch(assignProjectUser(projectId, assignee));
	};

	const deleteHandler = (assignee) => {
		console.log('deleteHandler');
	};

	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<FormContainer>
					<Form onSubmit={submitHandler} className="my-5">
						<Form.Group>
							<Row className="pl-3">
								<Form.Label>Assign to</Form.Label>
							</Row>
							<Row className="d-lg-inline-flex pl-3">
								<Form.Control
									as="select"
									value={assignee}
									onChange={(e) => setAssignee(e.target.value)}
									className="px-5"
								>
									<option value="select">--Select Name--</option>
									{users.map((user) => (
										<option key={user._id} value={user._id}>
											{user.firstName} {user.lastName}
										</option>
									))}
								</Form.Control>
							</Row>
							<Button
								type="submit"
								variant="primary"
								className="ml-4 mb-1 px-4"
							>
								Assign
							</Button>
						</Form.Group>
					</Form>
					{projectLoading ? (
						<Loader />
					) : (
						<>
							<p>
								<em>Assignees: </em>
							</p>
							{projectLoading ? (
								<Loader />
							) : projectError ? (
								<Message variant="info">{projectError}</Message>
							) : (
								<Table>
									<tbody>
										{project &&
											project.assignees.map((assignee) => (
												<tr key={assignee}>
													<td className="align-middle">{assignee}</td>
													<td className="text-right pr-4 align-middle">
														<Button
															variant="danger"
															className="btn-md ml-3"
															onClick={() => deleteHandler(assignee)}
														>
															<i className="fas fa-trash"></i>
														</Button>
													</td>
												</tr>
											))}
									</tbody>
								</Table>
							)}
						</>
					)}
				</FormContainer>
			)}
		</>
	);
};

export default Assignment;
