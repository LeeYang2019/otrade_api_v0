import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listStakeholders } from '../../actions/stakeholderActions';
import { saveActivityInfo } from '../../actions/activityActions';
import { ACTIVITY_ADD_RESET } from '../../constants/activityConstants';
import Message from '../../components/Message.js';
import BorderContainer from '../../components/BorderContainer';

const AddActivityScreen = ({ match, navigation, keyword = '' }) => {
	const projectId = match.params.id;
	const { next } = navigation;

	const dispatch = useDispatch();
	const stakeholderList = useSelector((state) => state.stakeholderList);
	const { stakeholders } = stakeholderList;

	const organizationAdd = useSelector((state) => state.organizationAdd);
	const { success } = organizationAdd;

	const activity = useSelector((state) => state.activitySave);
	const { activityInfo } = activity;

	//define states
	const [activityType, setActivityType] = useState(activityInfo.activity);
	const [date, setDate] = useState(activityInfo.date);
	const [members, setMembers] = useState([{ member: '' }]);
	const [actHours, setActHours] = useState(activityInfo.hours);
	const [location, setLocation] = useState(activityInfo.location);
	const [message, setMessage] = useState(null);

	useEffect(() => {
		if (success) {
			setMessage('Organization was successfully added.');
			dispatch({ type: ACTIVITY_ADD_RESET });
		} else {
			dispatch(listStakeholders(projectId, keyword));
		}
	}, [dispatch, success, projectId, keyword]);

	//add select field
	const addHandler = () => {
		setMembers([...members, { member: '' }]);
	};

	//filter out element i and update members
	const removeHandler = (i) => {
		const stakeholderToRemove = members[i];
		const list = members.filter((i) => i !== stakeholderToRemove);
		setMembers(list);
	};

	//add element to array && provide validation
	const handleInputChange = (e, i) => {
		e.preventDefault();

		//spread all members into a list
		const list = [...members];

		if (
			list.includes(e.target.value) ||
			list.some((item) => item._id === e.target.value)
		) {
			setMessage('Please make sure the same stakeholder is not added twice.');
		} else {
			list[i] = e.target.value;
			setMembers(list);
			setMessage('');
		}
	};

	//handle submit form
	const submitHandler = (e) => {
		e.preventDefault();

		//dispatch
		dispatch(
			saveActivityInfo({
				activity: activityType,
				date,
				hours: actHours,
				location,
				members,
			})
		);
		next();
	};

	return (
		<BorderContainer title={'(part 1)'}>
			{message && <Message variant="success">{message}</Message>}
			<Form onSubmit={submitHandler} className="mt-4 mb-3">
				<Row>
					<Col md={8}>
						<Form.Group controlId="activity">
							<Form.Label>Activity</Form.Label>
							<Form.Control
								as="select"
								value={activityType}
								onChange={(e) => setActivityType(e.target.value)}
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
					<Col md={12}>
						<Form.Label>Organization Members</Form.Label>
						{members &&
							members.map((assignee, i) => (
								<Row key={assignee}>
									<Col md={7}>
										<Form.Control
											as="select"
											value={assignee._id}
											onChange={(e) => handleInputChange(e, i)}
											className="px-5 mb-3"
										>
											<option value="">--Select--</option>
											{stakeholders &&
												stakeholders.map((stakeholder) => (
													<option key={stakeholder._id} value={stakeholder._id}>
														{stakeholder.firstName} {stakeholder.lastName}
													</option>
												))}
										</Form.Control>
									</Col>
									<Col md={5}>
										{stakeholders && stakeholders.length !== 1 && (
											<Button
												variant="danger"
												className="btn-md mr-3"
												onClick={() => removeHandler(i)}
											>
												<i className="fas fa-trash"></i>
											</Button>
										)}
										{stakeholders && stakeholders.length - 1 === i && (
											<Button className="px-3" onClick={() => addHandler(i)}>
												<i className="fas fa-plus"></i> Stakeholder
											</Button>
										)}
									</Col>
								</Row>
							))}
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
		</BorderContainer>
	);
};

export default AddActivityScreen;
