import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addActivity, removeActivityInfo } from '../../actions/activityActions';
import { ACTIVITY_ADD_RESET } from '../../constants/activityConstants';
import Message from '../../components/Message.js';
import BorderContainer from '../../components/BorderContainer';

const AddActivityScreenTwo = ({ match, navigation }) => {
	const projectId = match.params.id;
	const { previous, next } = navigation;

	//get activity success
	const dispatch = useDispatch();
	const activityAdd = useSelector((state) => state.activityAdd);
	const { success } = activityAdd;

	const activity = useSelector((state) => state.activitySave);
	const { activityInfo } = activity;

	//define states
	const [disPoints, setDispoints] = useState([{ point: '' }]);
	const [compromise, setcompromise] = useState('');
	const [message, setMessage] = useState(null);

	useEffect(() => {
		if (success) {
			setMessage('Activity was successfully added to the database.');
			dispatch({ type: ACTIVITY_ADD_RESET });
		}
	}, [dispatch, success]);

	// add input field
	const handleAdd = () => {
		//spread disPoints, add another object
		setDispoints([...disPoints, { point: '' }]);
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

		activityInfo.disPoints = disPoints;
		activityInfo.compromise = compromise;

		//save to database
		dispatch(addActivity(activityInfo, projectId));

		//clear out localstorage
		dispatch(removeActivityInfo());

		if (compromise === 'Yes') {
			next();
		}
	};

	return (
		<BorderContainer title={'(part 2)'}>
			{message && <Message variant="success">{message}</Message>}
			<Form onSubmit={submitHandler} className="mt-4 mb-3">
				<Form.Group controlId="discussion">
					<Form.Label>Discussion Points</Form.Label>
					{disPoints &&
						disPoints.map((point, i) => (
							<>
								<Row>
									<Col md={10}>
										<Form.Control
											className="mb-3"
											as="textarea"
											rows="2"
											placeholder="Enter Discussion"
											value={point.point}
											onChange={(e) => handleInputChange(e, i)}
										></Form.Control>
									</Col>
									<Col
										md={2}
										className="d-flex align-items-center justify-content-end mb-3"
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
				<Row className="mt-5">
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
