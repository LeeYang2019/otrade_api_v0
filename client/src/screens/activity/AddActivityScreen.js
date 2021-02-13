import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { saveActivityInfo } from '../../actions/activityActions';
import BorderContainer from '../../components/BorderContainer';
import MemberDropdown from '../../components/MemberDropdown';

const AddActivityScreen = ({ navigation, keyword = '' }) => {
	const { next } = navigation;

	const dispatch = useDispatch();

	const activity = useSelector((state) => state.activitySave);
	const { activityInfo } = activity;

	const stakeholderAssign = useSelector((state) => state.stakeholderAssign);
	const { members } = stakeholderAssign;

	//define states
	const [activityType, setActivityType] = useState(activityInfo.activity);
	const [date, setDate] = useState(activityInfo.date);
	const [actHours, setActHours] = useState(activityInfo.hours);
	const [location, setLocation] = useState(activityInfo.location);

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
				stakeholders: members,
			})
		);
		next();
	};

	return (
		<BorderContainer title={'(part 1)'}>
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
							<Form.Label>Activity Date</Form.Label>
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
				<hr />
				<MemberDropdown label={'Parties Involved'} />
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
