import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message.js';
import Loader from '../../components/Loader.js';

const AddOrganizationScreen = ({ history, match }) => {
	const projectId = match.params.projectId;

	//define states
	const [organization, setOrganization] = useState('');
	const [division, setDivision] = useState('');
	const [location, setLocation] = useState('');
	const [stakeholders, setStakeholders] = useState([]);
	const [email, setEmail] = useState('');
	const [telephone, setTelephone] = useState('');
	const [website, setWebsite] = useState('');

	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		if (!userInfo) {
			history.pushState('/login');
		} else {
			//if (success) {
			//
			//}
		}
	});

	const submitHandler = (e) => {
		e.preventDefault();
		console.log('submit');
		console.log(organization);
		console.log(division);
		console.log(location);
		//console.log(stakeholders);
		console.log(email);
		console.log(telephone);
		console.log(website);

		//dispatch
	};

	return (
		<>
			<Link to="/admin/projects" className="btn btn-primary my-3">
				Back to Project
			</Link>
			<Container className="w-50">
				<h1>Register Organization</h1>
				<hr />
				<Form onSubmit={submitHandler} className="my-5">
					<Row>
						<Col md={6}>
							<Form.Group controlId="organization">
								<Form.Label>Organization</Form.Label>
								<Form.Control
									type="organization"
									placeholder="Enter organization"
									value={organization}
									onChange={(e) => setOrganization(e.target.value)}
								></Form.Control>
							</Form.Group>
						</Col>
						<Col md={6}>
							<Form.Group controlId="division">
								<Form.Label>Division</Form.Label>
								<Form.Control
									as="select"
									value={division}
									onChange={(e) => setDivision(e.target.value)}
								>
									<option value="">--Select--</option>
									<option value="federal">Federal</option>
									<option value="province">Province</option>
									<option value="state">State</option>
								</Form.Control>
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col md={12}>
							<Form.Group controlId="location">
								<Form.Label>Location</Form.Label>
								<Form.Control
									type="location"
									placeholder="Enter Location"
									value={location}
									onChange={(e) => setLocation(e.target.value)}
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
					<Row>
						<Col md={8}>
							<Form.Group controlId="website">
								<Form.Label>Website</Form.Label>
								<Form.Control
									type="website"
									placeholder="Enter website"
									value={website}
									onChange={(e) => setWebsite(e.target.value)}
								></Form.Control>
							</Form.Group>
						</Col>
					</Row>
					<Row className="mt-5">
						<Col md={4}>
							<Form.Group controlId="stakeholders">
								<Form.Label>Stakeholders</Form.Label>
								<Form.Control
									type="stakeholders"
									placeholder="--select--"
									value={organization}
									onChange={(e) => setOrganization(e.target.value)}
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

export default AddOrganizationScreen;
