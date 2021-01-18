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
		<>
			{message && <Message variant="success">{message}</Message>}
			<Form onSubmit={submitHandler} className="my-5">
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
							<Form.Label>Location</Form.Label>
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
				<Row className="mt-5">
					<Col md={12}>
						<Form.Group controlId="discussion">
							<Form.Label>Discussion Points</Form.Label>
							{disPoints &&
								disPoints.map((point, i) => (
									<>
										<Row>
											<Col md={8}>
												<Form.Control
													className="mb-3"
													as="textarea"
													rows="4"
													placeholder="Enter Discussion"
													value={point.point}
													onChange={(e) => handleInputChange(e, i)}
												></Form.Control>
											</Col>
											<Col className="flex-bottom">
												<Button className="px-3" onClick={handleAdd}>
													Add Additional
												</Button>
											</Col>
										</Row>
									</>
								))}
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col>
						<Button type="submit" variant="primary" className="px-5 mt-3">
							Continue
						</Button>
					</Col>
				</Row>
			</Form>
		</>
	);
};

export default AddActivityScreen;
