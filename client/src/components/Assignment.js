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

const Assignment = ({ history, match }) => {
	const projectId = match.params.id;

	const [assignee, setAssignee] = useState('');

	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userList = useSelector((state) => state.userList);
	const { loading, error, users } = userList;

	const projectDetails = useSelector((state) => state.projectDetails);
	const {
		loading: projectLoading,
		error: projectError,
		project,
		assignees,
	} = projectDetails;

	const projectUserAssignment = useSelector(
		(state) => state.projectUserAssignment
	);
	const { success } = projectUserAssignment;

	console.log(assignees);

	useEffect(() => {
		if (userInfo && userInfo.role === 'admin') {
			dispatch(listProjectDetails(projectId));
			dispatch(listUsers());

			if (success) {
				dispatch(listProjectDetails(projectId));
				dispatch({ type: PROJECT_ASSIGNMENT_RESET });
			}
		} else {
			history.push('/login');
		}
	}, [dispatch, history, userInfo, projectId, success]);

	const submitHandler = (e) => {
		e.preventDefault();
		console.log(projectId);
		console.log(assignee);
		dispatch(assignProjectUser(projectId, assignee));
	};

	const deleteHandler = (assignee) => {};

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
							<h2>Project: {project.projectName}</h2>
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
							<Row className="mt-3">
								<Button
									type="submit"
									variant="primary"
									className="ml-3 mt-3 px-5"
								>
									Assign
								</Button>
							</Row>
						</Form.Group>
					</Form>
					{/* {projectLoading ? (
						<Loader />
					) : projectError ? (
						<Message variant="danger">{projectError}</Message>
					) : (
						<>
							<Table>
								<tbody>
									{project &&
										assignees.map((assignee) => (
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
						</>
					)} */}
				</FormContainer>
			)}
		</>
	);
};

export default Assignment;
