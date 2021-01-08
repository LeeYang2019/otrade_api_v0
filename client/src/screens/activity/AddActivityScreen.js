import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message.js';
import Loader from '../../components/Loader.js';

const AddActivityScreen = ({ history, match }) => {
	const projectId = match.params.projectId;

	//define states
	const [activity, setActivity] = useState('');
	const [date, setDate] = useState('');
	const [stakeholders, setStakeholders] = useState([]);
	const [disPoints, setDispoints] = useState([{ point: '' }]);
	const [actHours, setActHours] = useState(0);
	const [commitment, setCommitment] = useState('');
	const [isComplete, setIsComplete] = useState(null);

	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		if (!userInfo) {
			history.push('/login');
		} else {
			// if (success) {
			// }
		}
	});

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
		console.log(activity);
		console.log(date);
		console.log(stakeholders);
		console.log(disPoints);
		console.log(actHours);
		console.log(commitment);
		console.log(isComplete);
		//console.log(count);

		//dispatch
	};

	return (
		<>
			<Link to={`/project/${projectId}`} className="btn btn-primary my-3">
				Back to Project
			</Link>
			<Container className="w-75">
				<h1>Register Activity</h1>
				<hr />
				<Form onSubmit={submitHandler} className="my-5">
					<Row>
						<Col md={6}>
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
					</Row>
					<Row>
						<Col md={6}>
							<Form.Group controlId="date">
								<Form.Label>Date</Form.Label>
								<Form.Control
									type="date"
									placeholder="Enter Date"
									value={date}
									onChange={(e) => setDate(e.target.value)}
								></Form.Control>
							</Form.Group>
						</Col>
						<Col>
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
						<Col md={4}>
							<Form.Group controlId="commitment">
								<Form.Label>Compromise?</Form.Label>
								<Form.Control
									as="select"
									value={commitment}
									onChange={(e) => setCommitment(e.target.value)}
								>
									<option value="">--Select--</option>
									<option value="yes">Yes</option>
									<option value="no">No</option>
								</Form.Control>
							</Form.Group>
						</Col>
					</Row>
					<Row className="mt-5">
						<Col md={12}>
							<Form.Group controlId="discussion">
								<Form.Label>Discussion Points</Form.Label>
								{disPoints.map((point, i) => (
									<>
										<Row>
											<Col md={12}>
												<Form.Control
													className="mb-3"
													as="textarea"
													rows="4"
													placeholder="Enter Discussion"
													value={point.point}
													onChange={(e) => handleInputChange(e, i)}
												></Form.Control>
											</Col>
										</Row>
										<Row className="mb-3">
											<Col md={12}>
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
					{commitment && commitment === 'yes' && (
						<Row>
							<hr />
							Hello
						</Row>
					)}
					<Row className="mt-5">
						<Col md={4}>
							<Form.Group controlId="complete">
								<Form.Check
									type="checkbox"
									label="Is Complete?"
									checked={isComplete}
									onChange={(e) => setIsComplete(e.target.checked)}
								></Form.Check>
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col>
							<Button type="submit" variant="primary" className="px-5 mt-3">
								Register
							</Button>
						</Col>
					</Row>
				</Form>
			</Container>
		</>
	);
};

export default AddActivityScreen;
