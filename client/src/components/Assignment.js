import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row } from 'react-bootstrap';
import { listUsers } from '../actions/userActions';
import { assignProjectUser } from '../actions/projectActions';
import Message from '../components/Message';
import Loader from '../components/Loader';

const Assignment = ({ projectId }) => {
	const [assignee, setAssignee] = useState('');

	const dispatch = useDispatch();

	// get list of all users
	const userList = useSelector((state) => state.userList);
	const { loading, error, users } = userList;

	// get the assigned users of a project
	const projectUserAssignment = useSelector(
		(state) => state.projectUserAssignment
	);
	const { project } = projectUserAssignment;

	console.log(project);

	useEffect(() => {
		dispatch(listUsers());
	}, [dispatch]);

	const submitHandler = (e) => {
		e.preventDefault();
		console.log(assignee);
		//dispatch(assignProjectUser(projectId, assignee));
	};

	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
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
									{/* <option value="select">--Select Name--</option> */}
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
					<p>
						<em>Assignees: </em>
						{/* {project &&
							project.assignees.map((assignee) => assignee).join(', ')} */}
					</p>
				</>
			)}
		</>
	);
};

export default Assignment;
