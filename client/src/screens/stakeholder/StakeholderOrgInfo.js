import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
	addStakeholder,
	saveStakeholderInfo,
} from '../../actions/stakeholderActions';
import {
	STAKEHOLDER_ADD_RESET,
	STAKEHOLDER_SAVE_RESET,
} from '../../constants/stakeholderConstants';
import Message from '../../components/Message.js';

const AddStakeholderScreen = ({ navigation, match }) => {
	const projectId = match.params.id;

	console.log(match.params.id);
	console.log(projectId);

	//get stakeholder from localstorage
	const stakeholder = useSelector((state) => state.stakeholderSave);
	const { stakeholderInfo } = stakeholder;

	const { previous, next } = navigation;

	//define states
	const [organization, setOrganization] = useState(
		stakeholderInfo.organization
	);
	const [position, setPosition] = useState(stakeholderInfo.position);
	const [influence, setInfluence] = useState(stakeholderInfo.influence);
	const [projImpact, setProjImpact] = useState(stakeholderInfo.projImpact);
	const [message, setMessage] = useState(null);

	const dispatch = useDispatch();

	const stakeholderAdd = useSelector((state) => state.stakeholderAdd);
	const { success } = stakeholderAdd;

	useEffect(() => {
		if (success) {
			setMessage('Stakeholder was successfully added to the database.');
			dispatch({ type: STAKEHOLDER_ADD_RESET });
		}
	}, [dispatch, success]);

	const submitHandler = (e) => {
		e.preventDefault();

		//update stakeholderInfo in localStorage
		stakeholderInfo.organization = organization;
		stakeholderInfo.position = position;
		stakeholderInfo.influence = influence;
		stakeholderInfo.projImpact = projImpact;

		//save update to localstorage
		dispatch(saveStakeholderInfo(stakeholderInfo));

		//save to database
		dispatch(addStakeholder(stakeholderInfo, projectId));

		if (organization === 'Yes') {
			next();
		} else {
		}
	};

	return (
		<>
			{message && <Message variant="success">{message}</Message>}
			<Form onSubmit={submitHandler} className="my-5">
				<Form.Group controlId="organization">
					<Row>
						<Col md={10}>
							<Form.Label>
								Does the Stakeholder belong to an organization?
							</Form.Label>
						</Col>
						<Col md={2}>
							<Form.Control
								as="select"
								value={organization}
								required
								onChange={(e) => setOrganization(e.target.value)}
							>
								<option value="">--Select--</option>
								<option value="Yes">Yes</option>
								<option value="No">No</option>
							</Form.Control>
						</Col>
					</Row>
				</Form.Group>

				<Form.Group controlId="position" className="mt-5">
					<Row>
						<Col md={8}>
							<Form.Label>What is the stakeholder's position?</Form.Label>
						</Col>
						<Col md={4}>
							<Form.Control
								as="select"
								value={position}
								required
								disabled={!organization || organization === 'No'}
								onChange={(e) => setPosition(e.target.value)}
							>
								<option value="">--Select--</option>
								<option value="contrario">contrario</option>
								<option value="activo">activo</option>
								<option value="contrario pasivo">contrario pasivo</option>
								<option value="desconocido">desconocido</option>
								<option value="favorable activo">favorable activo</option>
								<option value="favorable inactivo">favorable inactivo</option>
								<option value="favorable con condiciones">
									favorable con condiciones
								</option>
								<option value="neutro">neutro</option>
							</Form.Control>
						</Col>
					</Row>
				</Form.Group>

				<Form.Group controlId="influence">
					<Row>
						<Col md={8}>
							<Form.Label>
								What is the stakeholder's level of influence on the project?
							</Form.Label>
						</Col>
						<Col md={4}>
							<Form.Control
								as="select"
								value={influence}
								required
								disabled={!organization || organization === 'No'}
								onChange={(e) => setInfluence(e.target.value)}
							>
								<option value="">--Select--</option>
								<option value="alto">alto</option>
								<option value="muy alto">muy alto</option>
								<option value="bajo">bajo</option>
								<option value="desconocido">desconocido</option>
								<option value="medio">medio</option>
							</Form.Control>
						</Col>
					</Row>
				</Form.Group>

				<Form.Group controlId="impact">
					<Row>
						<Col md={8}>
							<Form.Label>
								What is the stakeholder's level of impact on the project?
							</Form.Label>
						</Col>
						<Col md={4}>
							<Form.Control
								as="select"
								value={projImpact}
								required
								disabled={!organization || organization === 'No'}
								onChange={(e) => setProjImpact(e.target.value)}
							>
								<option value="">--Select--</option>
								<option value="alto">alto</option>
								<option value="muy alto">muy alto</option>
								<option value="bajo">bajo</option>
								<option value="desconocido">desconocido</option>
								<option value="medio">medio</option>
							</Form.Control>
						</Col>
					</Row>
				</Form.Group>

				<Row className="mt-3">
					<Col>
						<Button
							onClick={previous}
							variant="primary"
							className="px-5 mt-3 mr-3"
						>
							Previous
						</Button>
						<Button type="submit" variant="primary" className="px-5 mt-3">
							{organization === 'Yes' ? 'Continue' : 'Register'}
						</Button>
					</Col>
				</Row>
			</Form>
		</>
	);
};

export default AddStakeholderScreen;
