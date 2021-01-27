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
import BorderContainer from '../../components/BorderContainer';

const AddActivityScreen = ({ match, navigation }) => {
	const projectId = match.params.projectId;

	const { next } = navigation;

	//define states
	const [activity, setActivity] = useState('');
	const [date, setDate] = useState('');
	const [stakeholders, setStakeholders] = useState([]);
	const [disPoints, setDispoints] = useState([{ point: '' }]);
	const [actHours, setActHours] = useState(0);
	const [location, setLocation] = useState('');
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
		<BorderContainer title={'Activity (part 1)'}>
			{message && <Message variant="success">{message}</Message>}
			<Form onSubmit={submitHandler} className="mt-4 mb-3">
				<Row>
					<Col md={8}>
						<Form.Group controlId="activity">
							<Form.Label>Activity</Form.Label>
							<Form.Control
								as="select"
								value={activity}
								onChange={(e) => setActivity(e.target.value)}
							>
								<option value="select">--select--</option>
								<option value="consulta informal">consulta informal</option>
								<option value="reunion formal">reunion formal</option>
								<option value="asamblea en comunidad">
									asamblea en comunidad
								</option>
								<option value="socializacion">socializacion</option>
								<option value="apoyo a geologia">apoyo a geologia</option>
								<option value="apoyo a la fundacion">
									apoyo a la fundacion
								</option>
							</Form.Control>
						</Form.Group>
					</Col>
					<Col md={4}>
						<Form.Group controlId="hours">
							<Form.Label>Activity Hours</Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter activity hours"
								value={actHours}
								onChange={(e) => setActHours(e.target.value)}
							></Form.Control>
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col md={12}>
						<Form.Group controlId="location">
							<Form.Label>Location (street, city, state, country)</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter Location"
								value={location}
								onChange={(e) => setLocation(e.target.value)}
							></Form.Control>
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col md={4}>
						<Form.Group controlId="date">
							<Form.Label>Current Date</Form.Label>
							<Form.Control
								type="date"
								placeholder="Enter Date"
								value={date}
								onChange={(e) => setDate(e.target.value)}
							></Form.Control>
						</Form.Group>
					</Col>
				</Row>
				<hr />
				<Row className="mt-3">
					<Col md={12}></Col>
				</Row>
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

export default AddActivityScreen;
