import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getActivityDetails } from '../../actions/activityActions';
import { ACTIVITY_UPDATE_RESET } from '../../constants/activityConstants';
import BorderContainer from '../../components/BorderContainer';
import Message from '../../components/Message';
import Loader from '../../components/Loader';

const ActivityScreen = ({ match }) => {
	const activityId = match.params.id;
	const { url } = useRouteMatch();

	//get activity details
	const dispatch = useDispatch();
	const stakeholderList = useSelector((state) => state.stakeholderList);

	const activityDetails = useSelector((state) => state.activityDetails);
	const { loading, error, activity } = activityDetails;

	const activityUpdate = useSelector((state) => state.activityUpdate);
	const { success } = activityUpdate;

	//define state
	const [activityType, setActivityType] = useState();
	const [date, setDate] = useState();
	const [members, setMembers] = useState([{ member: '' }]);
	const [actHours, setActHours] = useState();
	const [location, setLocation] = useState();
	const [disPoints, setDispoints] = useState([{ point: '' }]);
	const [compromise, setcompromise] = useState('');
	const [message, setMessage] = useState(null);

	console.log(activity);

	useEffect(() => {
		if (success) {
			setMessage('Activity was successfully updated');
			dispatch(getActivityDetails(activityId));
			dispatch({ type: ACTIVITY_UPDATE_RESET });
		} else {
			if (!activity.activity || activity._id !== activityId) {
				dispatch(getActivityDetails(activityId));
			} else {
				setActivityType(activity.activity);
				setActHours(activity.hours);
				setDate(activity.date.substring(0, 10));
				setLocation(activity.location);
				setMembers(activity.stakeholders);
				setcompromise(activity.compromise);

				if (activity.discussPoints && activity.discussPoints.legnth === 0) {
					setDispoints([{ point: '' }]);
				} else {
					setDispoints(activity.discussPoints);
				}
			}
		}
	}, [dispatch, activity, activityId, success]);

	//add select field
	const addHandler = () => {
		setMembers([...members, { member: '' }]);
	};

	// add input field
	const handleAdd = () => {
		//spread disPoints, add another object
		setDispoints([...disPoints, { point: '' }]);
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
	};

	return (
		<BorderContainer>
			{message && <Message variant="success">{message}</Message>}
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error}</Message>
			) : (
				<>
					<Form onSubmit={submitHandler} className="mt-4 mb-3">
						<Row>
							<Col md={4}>
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
									<Form.Label>Hours</Form.Label>
									<Form.Control
										type="number"
										placeholder="Enter activity hours"
										value={actHours}
										onChange={(e) => setActHours(e.target.value)}
									></Form.Control>
								</Form.Group>
							</Col>
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
						<Row>
							<Col md={12}>
								<Form.Group controlId="location">
									<Form.Label>
										Location (street, city, state, country)
									</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter Location"
										value={location}
										onChange={(e) => setLocation(e.target.value)}
									></Form.Control>
								</Form.Group>
							</Col>
						</Row>
						<hr />
						<Row className="mt-3">
							<Col md={8}>
								<Form.Label>Parties Involved</Form.Label>
								{members &&
									members.map((assignee, i) => (
										<Row key={assignee._id}>
											<Col md={7}>
												<Form.Control
													as="select"
													value={assignee}
													onChange={(e) => handleInputChange(e, i)}
													className="px-5 mb-3"
												>
													<option value="">--Select--</option>
													{stakeholderList.stakeholders.map((stakeholder) => (
														<option
															key={stakeholder._id}
															value={stakeholder._id}
														>
															{stakeholder.firstName} {stakeholder.lastName}
														</option>
													))}
												</Form.Control>
											</Col>
											<Col md={5}>
												{members.length !== 1 && (
													<Button
														variant="danger"
														className="btn-md mr-3"
														onClick={() => removeHandler(i)}
													>
														<i className="fas fa-trash"></i>
													</Button>
												)}
												{members.length - 1 === i && (
													<Button
														className="px-3"
														onClick={() => addHandler(i)}
													>
														<i className="fas fa-plus"></i> Stakeholder
													</Button>
												)}
											</Col>
										</Row>
									))}
							</Col>
						</Row>
						<hr className="mb-3 mt-5" />
						<Row>
							<Col>
								<Form.Group controlId="discussion">
									<Form.Label>Discussion Points</Form.Label>
									{disPoints &&
										disPoints.map((point, i) => (
											<>
												<Row key={i}>
													<Col md={8}>
														<Form.Control
															className="mb-3"
															as="textarea"
															rows="2"
															placeholder="Enter Discussion"
															value={point}
															onChange={(e) => handleInputChange(e, i)}
														></Form.Control>
													</Col>
													<Col
														md={4}
														className="d-flex align-items-center justify-content-start mb-3"
													>
														<Button className="px-3" onClick={handleAdd}>
															<i className="fas fa-plus"></i> Additional
														</Button>
													</Col>
												</Row>
											</>
										))}
								</Form.Group>
								<hr className="my-5" />
								<Form.Group controlId="compromise" className="mb-5">
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
			)}
		</BorderContainer>
	);
};

export default ActivityScreen;
