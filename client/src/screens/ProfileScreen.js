import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import Message from '../components/Message.js';
import Loader from '../components/Loader.js';

const ProfileScreen = ({ location, history }) => {
	//define states
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState(null);

	const dispatch = useDispatch();

	//call the userDetails reducer in the store
	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
	const { success } = userUpdateProfile;

	useEffect(() => {
		if (!user.firstName) {
			dispatch(getUserDetails('profile'));
		} else {
			setFirstName(user.firstName);
			setLastName(user.email);
		}
	}, [dispatch, user]);

	const submitHandler = (e) => {
		e.preventDefault();
		//check password against confirmPassword
		if (password !== confirmPassword) {
			//set new message if not matched
			setMessage('Passwords do not match');
		} else {
			//otherwise, dispatch
			dispatch(
				updateUserProfile({
					id: user._id,
					firstName,
					lastName,
					email,
					password,
				})
			);
		}
	};

	return (
		<Row>
			<Col md={3}>
				<h2>User Profile</h2>
				{message && <Message variant="danger">{message}</Message>}
				{error && <Message variant="danger">{error}</Message>}
				{success && <Message variant="success">Profile Updated</Message>}
				{loading && <Loader />}
				<Form onSubmit={submitHandler}>
					<Form.Group controlId="firstName">
						<Form.Label>FirstName</Form.Label>
						<Form.Control
							type="firstName"
							placeholder="Enter firstName"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId="lastName">
						<Form.Label>LastName</Form.Label>
						<Form.Control
							type="lastName"
							placeholder="Enter lastName"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId="email">
						<Form.Label>Email Address</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId="password">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Enter password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId="confirmPassword">
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Confirm password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Button type="submit" variant="primary">
						Update
					</Button>
				</Form>
			</Col>
		</Row>
	);
};

export default ProfileScreen;
