import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProjectDetails } from '../../actions/projectActions';
import { listStakeholders } from '../../actions/stakeholderActions';
import { addActivity } from '../../actions/activityActions';
import { ACTIVITY_ADD_RESET } from '../../constants/activityConstants';
import Message from '../../components/Message.js';
import Loader from '../../components/Loader.js';

const AddActivityScreenTwo = ({ history, match }) => {
	const projectId = match.params.projectId;

	//define states
	const [compromise, setcompromise] = useState('');
	const [comment, setComment] = useState('');
	const [completionDate, setCompletionDate] = useState('');
	const [isComplete, setIsComplete] = useState(false);
	const [message, setMessage] = useState(null);

	const dispatch = useDispatch();

	//get logged in user
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	//get project
	const projectDetails = useSelector((state) => state.projectDetails);
	const { project } = projectDetails;

	//get stakeholders
	const stakeholderList = useSelector((state) => state.stakeholderList);
	const { stakeholders: stakeholdersList } = stakeholderList;

	//get activity success
	const activityAdd = useSelector((state) => state.activityAdd);
	const { success } = activityAdd;

	//handle submit form
	const submitHandler = (e) => {
		e.preventDefault();
		history.push(`/project/${projectId}/addActivityPart2`);
		// //dispatch
		// dispatch(
		// 	addActivity(
		// 		{
		// 			activity,
		// 			date,
		// 			hours: actHours,
		// 			compromise,
		// 			isComplete,
		// 			discussPoints: disPoints,
		// 			stakeholders,
		// 		},
		// 		projectId
		// 	)
		// );
	};

	return (
		<>
			<Link to={`/project/${projectId}`} className="btn btn-primary my-3">
				Back to Project
			</Link>
			<Container className="w-75">
				<h1>Register Activity</h1>
				<hr />
				{message && <Message variant="success">{message}</Message>}
				<Form onSubmit={submitHandler} className="my-5">
					<Form.Group controlId="compromise">
						<Form.Group controlId="discussion">
							<Form.Label>Compromise Details</Form.Label>
							<Row>
								<Col md={12}>
									<Form.Control
										className="mb-3"
										as="textarea"
										rows="4"
										placeholder="Enter Details"
										value={comment}
										onChange={(e) => setComment(e.target.value)}
									></Form.Control>
								</Col>
							</Row>
						</Form.Group>
					</Form.Group>

					<Form.Group controlId="date">
						<Row>
							<Col>
								<Form.Label>Completion Date</Form.Label>
							</Col>
							<Col>
								<Form.Control
									type="date"
									placeholder="Enter Date"
									value={setCompletionDate}
									onChange={(e) => setCompletionDate(e.target.value)}
								></Form.Control>
							</Col>
						</Row>
					</Form.Group>
					<Form.Group controlId="complete" className="mt-5">
						<Form.Check
							type="checkbox"
							label="Completed?"
							checked={isComplete}
							onChange={(e) => setIsComplete(e.target.checked)}
						></Form.Check>
					</Form.Group>

					<Row>
						<Col>
							<Button type="submit" variant="primary" className="px-5 mt-3">
								Continue
							</Button>
						</Col>
					</Row>
				</Form>
			</Container>
		</>
	);
};

export default AddActivityScreenTwo;
