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
		if (compromise === 'Yes') {
			history.push(`/project/${projectId}/addActivityPart3`);
		}
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
						<Row>
							<Col md={6}>
								<Form.Label>Is there a compromise?</Form.Label>
							</Col>
							<Col md={2}>
								<Form.Control
									as="select"
									value={compromise}
									onChange={(e) => setcompromise(e.target.value)}
								>
									<option value="">--Select--</option>
									<option value="Yes">Yes</option>
									<option value="No">No</option>
								</Form.Control>
							</Col>
						</Row>
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
