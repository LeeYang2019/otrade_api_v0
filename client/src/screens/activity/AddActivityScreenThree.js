import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listStakeholders } from '../../actions/stakeholderActions';
import { addActivity } from '../../actions/activityActions';
import { ACTIVITY_ADD_RESET } from '../../constants/activityConstants';
import Message from '../../components/Message.js';
import BorderContainer from '../../components/BorderContainer';

const AddActivityScreenTwo = ({ match, navigation }) => {
	const projectId = match.params.projectId;

	const { previous, next } = navigation;

	//define states
	const [comment, setComment] = useState('');
	const [completionDate, setCompletionDate] = useState('');
	const [isComplete, setIsComplete] = useState(false);

	const [message, setMessage] = useState(null);

	const dispatch = useDispatch();

	//get project details
	const projectDetails = useSelector((state) => state.projectDetails);
	const { loading, error, project } = projectDetails;

	//get stakeholders
	const stakeholderList = useSelector((state) => state.stakeholderList);
	const { stakeholders: stakeholdersList } = stakeholderList;

	//get activity success
	const activityAdd = useSelector((state) => state.activityAdd);
	const { success } = activityAdd;

	//handle submit form
	const submitHandler = (e) => {
		e.preventDefault();
		next();
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
		<BorderContainer title={'Activity'}>
			{message && <Message variant="success">{message}</Message>}
			<Form onSubmit={submitHandler} className="mt-4 mb-3">
				<Form.Group controlId="discussion">
					<Form.Label>Compromise Details</Form.Label>
					<Row>
						<Col md={8}>
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
				<Form.Group controlId="date">
					<Row>
						<Col md={4}>
							<Form.Label>Completion Date</Form.Label>
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
					<Button
						onClick={previous}
						variant="primary"
						className="px-5 mt-3 mr-3"
					>
						Previous
					</Button>
					<Button type="submit" variant="primary" className="px-5 mt-3">
						Continue
					</Button>
				</Row>
			</Form>
		</BorderContainer>
	);
};

export default AddActivityScreenTwo;
