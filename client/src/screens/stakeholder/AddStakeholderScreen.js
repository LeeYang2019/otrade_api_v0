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

	const [organization, setOrganization] = useState('');
	const [community, setCommunity] = useState('');

	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	//get incoming url
	const redirect = location.search ? location.search.split('=')[1] : '/';
	console.log(redirect);

	useEffect(() => {
		if (!userInfo) {
			history.push('/login');
		} else {
			// if (success) {
			// 	console.log('success');
			// 	history.push('/admin/projects');
			// }
		}
	}, [history, userInfo]);

	const submitHandler = (e) => {
		e.preventDefault();
		console.log(projectId);
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
					organization,
					community,
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
									type="gender"
									placeholder="Enter gender"
									value={gender}
									onChange={(e) => setGender(e.target.value)}
								></Form.Control>
							</Form.Group>
						</Col>
						<Col md={4}>
							<Form.Group controlId="birthdate">
								<Form.Label>BirthDate</Form.Label>
								<Form.Control
									type="birthdate"
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
						<Col md={4}>
							<Form.Group controlId="organization">
								<Form.Label>Organization</Form.Label>
								<Form.Control
									type="organization"
									placeholder="--select--"
									value={organization}
									onChange={(e) => setOrganization(e.target.value)}
								></Form.Control>
							</Form.Group>
						</Col>
						<Col md={4}>
							<Form.Group controlId="community">
								<Form.Label>Community</Form.Label>
								<Form.Control
									type="community"
									placeholder="--select--"
									value={community}
									onChange={(e) => setCommunity(e.target.value)}
								></Form.Control>
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
