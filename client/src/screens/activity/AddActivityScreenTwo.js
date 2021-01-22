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
import { Next } from 'react-bootstrap/esm/PageItem';
import BorderContainer from '../../components/BorderContainer';

const AddActivityScreenTwo = ({ match, navigation }) => {
	const projectId = match.params.projectId;

	const { next, previous } = navigation;

	//define states
	const [compromise, setcompromise] = useState('');
	const [isComplete, setIsComplete] = useState(false);
	const [message, setMessage] = useState(null);

	const dispatch = useDispatch();

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
			next();
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
		<BorderContainer title={'Activity (part 2)'}>
			{message && <Message variant="success">{message}</Message>}
			<Form onSubmit={submitHandler} className="mt-4 mb-3">
				<Form.Group controlId="compromise">
					<Row>
						<Col md={10}>
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
		</BorderContainer>
	);
};

export default AddActivityScreenTwo;
