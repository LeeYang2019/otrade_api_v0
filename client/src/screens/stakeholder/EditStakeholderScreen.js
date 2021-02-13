import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
	getStakeholderDetails,
	updateStakeholder,
} from '../../actions/stakeholderActions';
import { STAKEHOLDER_UPDATE_RESET } from '../../constants/stakeholderConstants';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import BorderContainer from '../../components/BorderContainer';

const EditStakeholderScreen = ({ match }) => {
	const stakeholderId = match.params.id;

	//get the stakeholder
	const dispatch = useDispatch();
	const stakeholderDetails = useSelector((state) => state.stakeholderDetails);
	const { loading, error, stakeholder } = stakeholderDetails;

	//get project
	const projectDetails = useSelector((state) => state.projectDetails);
	const { project } = projectDetails;

	//get success
	const stakeholderUpdate = useSelector((state) => state.stakeholderUpdate);
	const { success } = stakeholderUpdate;

	//define states
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [telephone, setTelephone] = useState('');
	const [gender, setGender] = useState('');
	const [birthdate, setBirthdate] = useState(Date);
	const [email, setEmail] = useState('');
	const [ethnicity, setEthnicity] = useState('');
	const [media, setMedia] = useState([{ website: '' }]);
	const [organization, setOrganization] = useState();
	const [position, setPosition] = useState();
	const [influence, setInfluence] = useState();
	const [projImpact, setProjImpact] = useState();

	useEffect(() => {
		if (success) {
			dispatch(getStakeholderDetails(stakeholderId));
			dispatch({ type: STAKEHOLDER_UPDATE_RESET });
		} else {
			setFirstName(stakeholder.firstName);
			setLastName(stakeholder.lastName);
			setGender(stakeholder.gender);
			setBirthdate(stakeholder.birthdate);
			setEthnicity(stakeholder.ethnicity);
			setEmail(stakeholder.email);
			setTelephone(stakeholder.telephone);
			setMedia(stakeholder.media);
			setPosition(stakeholder.position);
			setInfluence(stakeholder.influence);
			setProjImpact(stakeholder.projImpact);
			setOrganization(stakeholder.organization);
		}
	}, [dispatch, stakeholder, stakeholderId, success, project]);

	//add input field
	const addHandler = (i) => {
		setMedia([...media, { website: '' }]);
	};

	const removeHandler = (i) => {
		const removeItem = media[i];
		const list = media.filter((i) => i !== removeItem);
		setMedia(list);
	};

	//handle input change
	const handleInputChange = (e, i) => {
		e.preventDefault();
		const list = [...media];
		list[i] = e.target.value;
		setMedia(list);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			updateStakeholder(
				{
					firstName,
					lastName,
					telephone,
					gender,
					birthdate,
					email,
					ethnicity,
					media,
					position,
					influence,
					projImpact,
					organization,
				},
				stakeholderId
			)
		);
	};

	return (
		<BorderContainer title={''}>
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error}</Message>
			) : (
				<>
					<Form onSubmit={submitHandler} className="mt-4 mb-3">
						<Row>
							<Col md={6}>
								<Form.Group controlId="firstName">
									<Form.Label>First Name</Form.Label>
									<Form.Control
										type="firstName"
										placeholder="Enter name"
										value={firstName}
										onChange={(e) => setFirstName(e.target.value)}
									></Form.Control>
								</Form.Group>
							</Col>
							<Col md={6}>
								<Form.Group controlId="lastName">
									<Form.Label>Last Name</Form.Label>
									<Form.Control
										type="lastName"
										placeholder="Enter name"
										value={lastName}
										onChange={(e) => setLastName(e.target.value)}
									></Form.Control>
								</Form.Group>
							</Col>
						</Row>
						<Row>
							<Col md={4}>
								<Form.Group controlId="gender">
									<Form.Label>Gender</Form.Label>
									<Form.Control
										as="select"
										value={gender}
										onChange={(e) => setGender(e.target.value)}
									>
										<option value="">--Select--</option>
										<option value="male">Male</option>
										<option value="female">Female</option>
										<option value="other">Other</option>
									</Form.Control>
								</Form.Group>
							</Col>
							<Col md={4}>
								<Form.Group controlId="birthdate">
									<Form.Label>BirthDate</Form.Label>
									<Form.Control
										type="date"
										value={birthdate && birthdate.substring(0, 10)}
										onChange={(e) => setBirthdate(e.target.value)}
									></Form.Control>
								</Form.Group>
							</Col>
							<Col md={4}>
								<Form.Group controlId="ethnicity">
									<Form.Label>Ethnicity</Form.Label>
									<Form.Control
										type="ethnicity"
										placeholder="Enter ethnicity"
										value={ethnicity}
										onChange={(e) => setEthnicity(e.target.value)}
									></Form.Control>
								</Form.Group>
							</Col>
						</Row>
						<Row>
							<Col md={6}>
								<Form.Group controlId="email">
									<Form.Label>Email Address</Form.Label>
									<Form.Control
										type="email"
										placeholder="Enter email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									></Form.Control>
								</Form.Group>
							</Col>
							<Col md={4}>
								<Form.Group controlId="telephone">
									<Form.Label>Telephone</Form.Label>
									<Form.Control
										type="telephone"
										placeholder="Enter telephone"
										value={telephone}
										onChange={(e) => setTelephone(e.target.value)}
									></Form.Control>
								</Form.Group>
							</Col>
						</Row>
						<Row className="mt-4">
							<Col md={9}>
								<Form.Group controlId="media">
									<Form.Label>Social Media</Form.Label>
									{media &&
										media.map((site, i) => (
											<Row key={i}>
												<Col md={6}>
													<Form.Control
														className="mb-3"
														placeholder="Add Website"
														value={site}
														onChange={(e) => handleInputChange(e, i)}
													></Form.Control>
												</Col>
												<Col>
													{media.length !== 1 && (
														<Button
															variant="danger"
															className="btn-md mr-3 mb-1"
															onClick={() => removeHandler(i)}
														>
															<i className="fas fa-trash"></i>
														</Button>
													)}
													{media.length - 1 === i && (
														<Button
															className="px-3"
															onClick={() => addHandler(i)}
														>
															<i className="fas fa-plus"></i> Add
														</Button>
													)}
												</Col>
											</Row>
										))}
								</Form.Group>
							</Col>
						</Row>
						<hr className="mb-4" />
						<Form.Group controlId="organization">
							<Row>
								<Col md={10}>
									<Form.Label>
										Does {firstName} belong to an organization?
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
										<option value="yes">Yes</option>
										<option value="no">No</option>
									</Form.Control>
								</Col>
							</Row>
						</Form.Group>

						<Form.Group controlId="position" className="mt-5">
							<Row>
								<Col md={8}>
									<Form.Label>What is {firstName}'s position?</Form.Label>
								</Col>
								<Col md={4}>
									<Form.Control
										as="select"
										value={position}
										required
										disabled={!organization || organization === 'no'}
										onChange={(e) => setPosition(e.target.value)}
									>
										<option value="">--Select--</option>
										<option value="contrario">contrario</option>
										<option value="activo">activo</option>
										<option value="contrario pasivo">contrario pasivo</option>
										<option value="desconocido">desconocido</option>
										<option value="favorable activo">favorable activo</option>
										<option value="favorable inactivo">
											favorable inactivo
										</option>
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
										What is {firstName}'s level of influence on the project?
									</Form.Label>
								</Col>
								<Col md={4}>
									<Form.Control
										as="select"
										value={influence}
										required
										disabled={!organization || organization === 'no'}
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
										What is {firstName}'s level of impact on the project?
									</Form.Label>
								</Col>
								<Col md={4}>
									<Form.Control
										as="select"
										value={projImpact}
										required
										disabled={!organization || organization === 'no'}
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
						<Button type="submit" variant="primary" className="mt-3 px-5">
							Update
						</Button>
					</Form>
				</>
			)}
		</BorderContainer>
	);
};

export default EditStakeholderScreen;
