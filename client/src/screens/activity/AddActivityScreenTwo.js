import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
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
	const [stakeholders, setStakeholders] = useState([]);
	const [disPoints, setDispoints] = useState([{ point: '' }]);
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

	// add input field
	const handleAdd = () => {
		//spread disPoints, add another object
		setDispoints([...disPoints, { point: '' }]);
	};

	//filter out element i
	const removeHandler = (i) => {
		const stakeholderToRemove = stakeholders[i];
		const list = stakeholders.filter((i) => i !== stakeholderToRemove);
		setStakeholders(list);
	};

	//handle input change
	const handleInputChange = (e, i) => {
		e.preventDefault();
		const list = [...disPoints];
		list[i] = e.target.value;
		setDispoints(list);
	};

	//handle submit form
	const submitHandler = (e) => {
		e.preventDefault();

		// if (compromise === 'Yes') {
		// 	next();
		// }
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
				<Form.Group controlId="discussion">
					<Form.Label>Discussion Points</Form.Label>
					{disPoints &&
						disPoints.map((point, i) => (
							<>
								<Row>
									<Col md={8}>
										<Form.Control
											className="mb-1"
											as="textarea"
											rows="4"
											placeholder="Enter Discussion"
											value={point.point}
											onChange={(e) => handleInputChange(e, i)}
										></Form.Control>
									</Col>
								</Row>
								<Row>
									<Col md={8} className="d-flex justify-content-end mb-3">
										<Button className="px-3" onClick={handleAdd}>
											<i className="fas fa-plus"></i> Additional
										</Button>
									</Col>
								</Row>
							</>
						))}
				</Form.Group>
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
					</Col>
				</Row>
			</Form>
		</BorderContainer>
	);
};

export default AddActivityScreenTwo;
