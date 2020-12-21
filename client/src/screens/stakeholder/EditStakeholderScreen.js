import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';

const EditStakeholderScreen = ({ userId }) => {
	//define states
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [telephone, setTelephone] = useState('');
	const [gender, setGender] = useState('');
	const [birthdate, setBirthdate] = useState('');
	const [email, setEmail] = useState('');

	const [organization, setOrganization] = useState('');

	const dispatch = useDispatch();

	//call the userRegister reducer in the store
	// const userDetails = useSelector((state) => state.userDetails);
	// const { loading, error, user } = userDetails;

	// const userUpdate = useSelector((state) => state.userUpdate);
	// const {
	// 	loading: loadingUpdate,
	// 	error: errorUpdate,
	// 	success: successUpdate,
	// } = userUpdate;

	// const userRegister = useSelector((state) => state.userRegister);
	// const { userInfo } = userRegister;

	// useEffect(() => {
	// 	if (successUpdate) {
	// 		dispatch({ type: USER_UPDATE_RESET });
	// 		history.push('/admin/userlist');
	// 	} else {
	// 		if (!user.name || user._id !== userId) {
	// 			dispatch(getUserDetails(userId));
	// 		} else {
	// 			setName(user.name);
	// 			setEmail(user.email);
	// 			setIsAdmin(user.isAdmin);
	// 		}
	// 	}
	// }, [dispatch, user, userId, successUpdate, history]);

	const submitHandler = (e) => {
		// e.preventDefault();
		// dispatch(updateUser({ _id: userId, name, email, isAdmin }));
	};

	return (
		<>
			<Container>
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
									placeholder="Enter email"
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
					</Row>
					<Button type="submit" variant="primary" className="mt-3 px-5">
						Update
					</Button>
				</Form>
			</Container>
		</>
	);
};

export default EditStakeholderScreen;
