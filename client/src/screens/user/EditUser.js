import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile, getUserDetails } from '../../actions/userActions';
import { USER_PROFILE_UPDATE_RESET } from '../../constants/userConstants';
import Message from '../../components/Message';
import Loader from '../../components/Loader';

const EditUser = ({ userId }) => {
	//define states
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [telephone, setTelephone] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState(null);
	const [updatedDate, setUpdatedDate] = useState('');

	const dispatch = useDispatch();

	//get the user
	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	//get success from user update
	const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
	const { success: successUpdate } = userUpdateProfile;

	useEffect(() => {
		if (successUpdate) {
			setMessage('User profile has successfully been updated.');
			dispatch(getUserDetails(userId));
			dispatch({ type: USER_PROFILE_UPDATE_RESET });
			setPassword('');
			setConfirmPassword('');
		} else {
			setFirstName(user.firstName);
			setLastName(user.lastName);
			setTelephone(user.telephone);
			setEmail(user.email);
			setUpdatedDate(user.updatedAt);
		}
	}, [dispatch, userId, user, successUpdate]);

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
					telephone,
					password,
				})
			);
		}
	};

	return (
		<>
			{error && <Message variant="danger">{error}</Message>}
			{successUpdate && <Message variant="success">{message}</Message>}
			{loading && <Loader />}
			<Container>
				{/* {userInfo && userInfo._id === user._id ? ( */}
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
							<Form.Group controlId="password">
								<Form.Label>Password</Form.Label>
								<Form.Control
									type="password"
									placeholder="Enter Password"
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
									placeholder="Re-type Password"
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
						<Col className="text-right">
							<p>updated on: {updatedDate.substring(0, 10)}</p>
						</Col>
					</Row>
				</Form>
				{/* ) : (
					<Message variant="danger">
						ADMIN NOT ALLOWED TO THIS PROTECTED ROUTE
					</Message>
				)} */}
			</Container>
		</>
	);
};

export default EditUser;
