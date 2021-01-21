import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../actions/userActions';
import Message from '../../components/Message';
import Loader from '../../components/Loader';

const UserAddScreen = ({ history }) => {
	//define states
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [telephone, setTelephone] = useState('');
	const [email, setEmail] = useState('');
	const [status, setStatus] = useState('');
	const [role, setRole] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState('');

	//add fileupload
	const [image, setImage] = useState('');
	const [uploading, setUploading] = useState(false);

	const dispatch = useDispatch();

	//get logged-in user information
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userRegister = useSelector((state) => state.userRegister);
	const { success } = userRegister;

	useEffect(() => {
		if (!userInfo || userInfo.role !== 'admin') {
			history.push('/login');
		} else {
			console.log(success);
			if (success) {
				console.log('success');
				history.push('/admin/userlist');
			}
		}
	}, [dispatch, history, userInfo, success]);

	const uploadFileHandler = async (e) => {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append('image', file);
		setUploading(true);

		try {
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			};

			const { data } = await axios.post('/api/v1/uploads', formData, config);

			setImage(data);
			setUploading(false);
		} catch (error) {
			console.error(error);
			setUploading(false);
		}
	};

	const submitHandler = (e) => {
		e.preventDefault();

		console.log('password: ', password);
		console.log('confirmPassword: ', confirmPassword);

		if (password !== confirmPassword) {
			setMessage('Passwords do not match');
		} else {
			dispatch(
				registerUser({
					firstName,
					lastName,
					image,
					email,
					telephone,
					role,
					status,
					password,
					confirmPassword,
				})
			);
		}
	};

	return (
		<>
			<Link to="/admin/userList" className="btn btn-primary my-3">
				Back to User List
			</Link>

			<div className="border-container">
				<h1>Register User</h1>
				<hr className="mt-4 mb-4" />
				{message && <Message variant="danger">{message}</Message>}
				<Form onSubmit={submitHandler} className="mt-4 mb-3">
					<Row>
						<Col md={6}>
							<Form.Group controlId="firstName">
								<Form.Label>First Name</Form.Label>
								<Form.Control
									type="firstName"
									placeholder="Enter name"
									value={firstName}
									required
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
									required
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
									required
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
									required
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
									required
									onChange={(e) => setRole(e.target.value)}
								>
									<option value="">--select--</option>
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
									required
									onChange={(e) => setStatus(e.target.value)}
								>
									<option value="">--select--</option>
									<option value="active">active</option>
									<option value="inactive">inactive</option>
								</Form.Control>
							</Form.Group>
						</Col>
					</Row>
					<hr className="my-4" />
					<Row>
						<Col>
							<Form.Group controlId="image">
								<Form.Label>Image</Form.Label>
								<Row className="mb-3">
									<Col md={6}>
										<Form.Control
											type="text"
											placeholder="Enter image url"
											value={image}
											onChange={(e) => setImage(e.target.value)}
										></Form.Control>
									</Col>
								</Row>
								<Row>
									<Col md={6}>
										<Form.File
											id="image-file"
											label="Choose File"
											custom
											onChange={uploadFileHandler}
										>
											{uploading && <Loader />}
										</Form.File>
									</Col>
								</Row>
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
									placeholder="Enter password"
									value={password}
									required
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
									required
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
			</div>
		</>
	);
};

export default UserAddScreen;
