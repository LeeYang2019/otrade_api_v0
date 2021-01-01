import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addStakeholder } from '../../actions/stakeholderActions';
import Message from '../../components/Message.js';
import Loader from '../../components/Loader.js';

const AddStakeholderScreen = ({ location, history, match }) => {
	const projectId = match.params.projectId;

	//define states
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [telephone, setTelephone] = useState('');
	const [gender, setGender] = useState('');
	const [birthdate, setBirthdate] = useState('');
	const [email, setEmail] = useState('');
	const [ethnicity, setEthnicity] = useState('');
	const [media, setMedia] = useState([{ website: '' }]);

	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		if (!userInfo) {
			history.push('/login');
		}
	}, [history, userInfo]);

	//add input field
	const addHandler = (i) => {
		console.log('i: ', i);
		console.log('list[i]: ', media[i]);
		console.log(media);
		setMedia([...media, { website: '' }]);
	};

	const removeHandler = (i) => {
		console.log('i: ', i);
		console.log('list[i]: ', media[i]);

		const list = [...media];
		list.splice(i, 1);
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
			addStakeholder(
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
				projectId
			)
		);
	};

	return (
		<>
			<Link to="/admin/projects" className="btn btn-primary my-3">
				Back to Project
			</Link>
			<Container className="w-50">
				<h1>Register Stakeholder</h1>
				<hr />
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
									placeholder="Enter birthdate"
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
								{media.map((site, i) => (
									<Row>
										<Col md={8}>
											<Form.Control
												className="mb-3"
												placeholder="Add Website"
												value={site.website}
												required
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
												<Button className="px-3" onClick={() => addHandler(i)}>
													<i className="fas fa-plus"></i> Add
												</Button>
											)}
										</Col>
										{/* <div style={{ marginTop: 20 }}>
														{JSON.stringify(assignments)}
													</div> */}
									</Row>
								))}
							</Form.Group>
						</Col>
					</Row>
					<Row className="mt-3">
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

export default AddStakeholderScreen;
