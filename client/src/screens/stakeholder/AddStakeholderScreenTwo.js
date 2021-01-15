import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addStakeholder } from '../../actions/stakeholderActions';
import Message from '../../components/Message.js';
import { STAKEHOLDER_ADD_RESET } from '../../constants/stakeholderConstants';
import RegisterSteps from '../../components/RegisterSteps';

const AddStakeholderScreen = ({ location, history, match }) => {
	const projectId = match.params.projectId;

	//define states
	const [organization, setOrganization] = useState('');
	const [position, setPosition] = useState('');
	const [influence, setInfluence] = useState('');
	const [projImpact, setProjImpact] = useState('');

	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const stakeholderAdd = useSelector((state) => state.stakeholderAdd);
	const { success } = stakeholderAdd;

	const submitHandler = (e) => {
		e.preventDefault();

		if (organization === 'Yes') {
			//TODO: Save the stakeholder
			//PUSH to addOrganization
			history.push(`/project/${projectId}/addOrganization`);
		} else {
			//return back to stakeholder
		}

		// dispatch(
		// 	addStakeholder(
		// 		{
		// 			firstName,
		// 			lastName,
		// 			telephone,
		// 			gender,
		// 			birthdate,
		// 			email,
		// 			ethnicity,
		// 			media,
		// 		},
		// 		projectId
		// 	)
		// );
	};

	return (
		<>
			<Link to={`/project/${projectId}`} className="btn btn-primary my-3">
				Back to Project
			</Link>
			<Container className="w-75">
				<h1>Register Stakeholder</h1>
				<hr />

				<Form onSubmit={submitHandler} className="my-5">
					<RegisterSteps projectId={projectId} step1 />
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
							<Button type="submit" variant="primary" className="px-5 mt-3">
								{organization === 'Yes' ? 'Continue' : 'Register'}
							</Button>
						</Col>
					</Row>
				</Form>
			</Container>
		</>
	);
};

export default AddStakeholderScreen;
