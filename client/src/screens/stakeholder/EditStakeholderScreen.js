import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
	getStakeholderDetails,
	updateStakeholder,
} from '../../actions/stakeholderActions';
import { listProjectDetails } from '../../actions/projectActions';
import { STAKEHOLDER_UPDATE_RESET } from '../../constants/stakeholderConstants';
import Message from '../../components/Message';
import Loader from '../../components/Loader';

const EditStakeholderScreen = ({ projectId, stakeholderId }) => {
	//define states
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [telephone, setTelephone] = useState('');
	const [gender, setGender] = useState('');
	const [birthdate, setBirthdate] = useState();
	const [email, setEmail] = useState('');
	const [ethnicity, setEthnicity] = useState('');
	const [media, setMedia] = useState([{ website: '' }]);

	const [message, setMessage] = useState(null);

	const dispatch = useDispatch();

	//get the stakeholder
	const stakeholderDetails = useSelector((state) => state.stakeholderDetails);
	const { loading, error, stakeholder } = stakeholderDetails;

	//get project
	const projectDetails = useSelector((state) => state.projectDetails);
	const { project } = projectDetails;

	//get success
	const stakeholderUpdate = useSelector((state) => state.stakeholderUpdate);
	const { success } = stakeholderUpdate;

	console.log(stakeholder);

	useEffect(() => {
		if (success) {
			setMessage('Stakeholder was successfully updated.');
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
		}
	}, [dispatch, stakeholder, stakeholderId, success, project, projectId]);

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
				},
				stakeholderId
			)
		);
	};

	return (
		<>
			<Container>
				{message && <Message variant="success">{message}</Message>}
				{loading ? (
					<Loader />
				) : error ? (
					<Message>{error}</Message>
				) : (
					<Form onSubmit={submitHandler} className="my-5">
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
										value={birthdate}
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
							<Col md={8}>
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
						<Row className="mt-5">
							<Col md={12}>
								<Form.Group controlId="media">
									<Form.Label>Social Media</Form.Label>
									{media &&
										media.map((site, i) => (
											<Row>
												<Col md={8}>
													<Form.Control
														className="mb-3"
														placeholder="Add Website"
														value={site.website}
														onChange={(e) => handleInputChange(e, i)}
													></Form.Control>
												</Col>
												<Col>
													{media.length !== 1 && (
														<Button
															variant="danger"
															className="btn-md mr-3"
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
						<Button type="submit" variant="primary" className="mt-3 px-5">
							Update
						</Button>
					</Form>
				)}
			</Container>
		</>
	);
};

export default EditStakeholderScreen;
