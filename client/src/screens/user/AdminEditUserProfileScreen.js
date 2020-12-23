import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUser } from '../../actions/userActions';
import { USER_UPDATE_RESET } from '../../constants/userConstants';
import Message from '../../components/Message';
import Loader from '../../components/Loader';

const AdminEditUserProfileScreen = ({ match, history }) => {
	const userId = match.params.id;

	//define states
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [telephone, setTelephone] = useState('');
	const [email, setEmail] = useState('');
	const [status, setStatus] = useState('');
	const [role, setRole] = useState('');

	const dispatch = useDispatch();

	// get user
	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	const userUpdate = useSelector((state) => state.userUpdate);
	const {
		loading: loadingUpdate,
		success: successUpdate,
		error: errorUpdate,
	} = userUpdate;

	console.log(user);

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: USER_UPDATE_RESET });
			history.push('/admin/userlist');
		} else {
			if (!user.firstName || user._id !== userId) {
				dispatch(getUserDetails(userId));
			} else {
				setFirstName(user.firstName);
				setLastName(user.lastName);
				setTelephone(user.telephone);
				setEmail(user.email);
				setStatus(user.status);
				setRole(user.role);
			}
		}
	}, [history, dispatch, userId, user, successUpdate]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			updateUser({
				_id: userId,
				firstName,
				lastName,
				telephone,
				email,
				status,
				role,
			})
		);
	};

	return (
		<>
			<Container className="w-50">
				{loadingUpdate && <Loader />}
				{errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
				{successUpdate && <Message variant="success">Profile Update</Message>}
				<h1>Update User</h1>
				<hr />
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant="danger">{error}</Message>
				) : (
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
						<Button type="submit" variant="primary" className="mt-4 px-5">
							Update
						</Button>
					</Form>
				)}
			</Container>
		</>
	);
};

export default AdminEditUserProfileScreen;
