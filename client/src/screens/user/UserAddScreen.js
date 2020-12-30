import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';

const UserAddScreen = () => {
	//define states
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [telephone, setTelephone] = useState('');
	const [email, setEmail] = useState('');
	const [status, setStatus] = useState('');
	const [role, setRole] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const submitHandler = () => {};

	return (
		<>
			<Link to="/admin/userList" className="btn btn-primary my-3">
				Back to User List
			</Link>
			<Container className="w-75">
				<h1>Register User</h1>
				<hr />

				<Form onSubmit={submitHandler} className="my-4">
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
					<hr className="my-4" />
					<Row>
						<Col md={6}>
							<Form.Group controlId="role">
								<Form.Label>Role</Form.Label>
								<Form.Control
									as="select"
									value={role}
									onChange={(e) => setRole(e.target.value)}
								>
									<option value="client">client</option>
									<option value="surveyor">surveyor</option>
									<option value="admin">admin</option>
								</Form.Control>
							</Form.Group>
						</Col>
						<Col md={4}>
							<Form.Group controlId="status">
								<Form.Label>Status</Form.Label>
								<Form.Control
									as="select"
									value={status}
									onChange={(e) => setStatus(e.target.value)}
								>
									<option value="active">active</option>
									<option value="inactive">inactive</option>
								</Form.Control>
							</Form.Group>
						</Col>
					</Row>
					<hr className="my-4" />
					<Row>
						<Col md={6}>
							<Form.Group controlId="password">
								<Form.Label>Email Address</Form.Label>
								<Form.Control
									type="password"
									placeholder="Enter password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								></Form.Control>
							</Form.Group>
						</Col>
						<Col md={6}>
							<Form.Group controlId="confirmPassword">
								<Form.Label>Re-type Password</Form.Label>
								<Form.Control
									type="password"
									placeholder="Re-type password"
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
								></Form.Control>
							</Form.Group>
						</Col>
					</Row>
					<Row className="mt-3">
						<Col>
							<Button type="submit" variant="primary" className="px-5 mt-3">
								Update
							</Button>
						</Col>
					</Row>
				</Form>
			</Container>
		</>
	);
};

export default UserAddScreen;
