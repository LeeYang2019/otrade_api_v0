import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addOrganization } from '../../actions/organizationAction';
import Message from '../../components/Message.js';
import { ORGANIZATION_ADD_RESET } from '../../constants/organizationConstants';
import { listStakeholders } from '../../actions/stakeholderActions';
import BorderContainer from '../../components/BorderContainer';

const AddOrganizationScreen = ({ keyword = '' }) => {
	//define states
	const [organization, setOrganization] = useState('');
	const [division, setDivision] = useState('');
	const [location, setLocation] = useState('');
	const [email, setEmail] = useState('');
	const [telephone, setTelephone] = useState('');
	const [website, setWebsite] = useState('');
	const [members, setMembers] = useState([{ member: '' }]);
	const [message, setMessage] = useState(null);

	const dispatch = useDispatch();

	//get project details
	const projectDetails = useSelector((state) => state.projectDetails);
	const { project } = projectDetails;

	//get stakeholders
	const stakeholderList = useSelector((state) => state.stakeholderList);
	const { stakeholders } = stakeholderList;

	//get addorganization success
	const organizationAdd = useSelector((state) => state.organizationAdd);
	const { success } = organizationAdd;

	useEffect(() => {
		if (success) {
			setMessage('Organization was successfully added.');
			dispatch({ type: ORGANIZATION_ADD_RESET });
		} else {
			dispatch(listStakeholders(project._id, keyword));
		}
	}, [dispatch, success, project, keyword]);

	//add select field
	const addHandler = () => {
		setMembers([...members, { member: '' }]);
	};

	//filter out element i and update members
	const removeHandler = (i) => {
		const stakeholderToRemove = members[i];
		const list = members.filter((i) => i !== stakeholderToRemove);
		setMembers(list);
	};

	//add element to array && provide validation
	const handleInputChange = (e, i) => {
		e.preventDefault();

		//spread all members into a list
		const list = [...members];

		if (
			list.includes(e.target.value) ||
			list.some((item) => item._id === e.target.value)
		) {
			setMessage('Please make sure the same stakeholder is not added twice.');
		} else {
			list[i] = e.target.value;
			setMembers(list);
			setMessage('');
		}
	};

	//submit form
	const submitHandler = (e) => {
		e.preventDefault();

		dispatch(
			addOrganization(
				{
					name: organization,
					division,
					address: location,
					email,
					telephone,
					website,
					stakeholders: members,
				},
				project._id
			)
		);
	};

	return (
		<BorderContainer title={'Organization'}>
			{message && <Message variant="success">{message}</Message>}
			<Form onSubmit={submitHandler} className="mt-4 mb-3">
				<Row>
					<Col md={6}>
						<Form.Group controlId="organization">
							<Form.Label>Name of Organization</Form.Label>
							<Form.Control
								type="organization"
								placeholder="Enter organization"
								value={organization}
								required
								onChange={(e) => setOrganization(e.target.value)}
							></Form.Control>
						</Form.Group>
					</Col>
					<Col md={6}>
						<Form.Group controlId="division">
							<Form.Label>Political Division</Form.Label>
							<Form.Control
								as="select"
								value={division}
								required
								onChange={(e) => setDivision(e.target.value)}
							>
								<option value="">--Select--</option>
								<option value="Canton">Canton</option>
								<option value="Comunidad">Comunidad</option>
								<option value="Federacion">Federacion</option>
								<option value="Parroquia">Parroquia</option>
								<option value="Provincia">Provincia</option>
							</Form.Control>
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col md={12}>
						<Form.Group controlId="location">
							<Form.Label>Address (street, city, state, country)</Form.Label>
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
					<Col md={6}>
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
					<Col md={6} className="mt-3">
						<Form.Group controlId="website">
							<Form.Label>Social Media</Form.Label>
							<Form.Control
								type="website"
								placeholder="Enter website"
								value={website}
								onChange={(e) => setWebsite(e.target.value)}
							></Form.Control>
						</Form.Group>
					</Col>
				</Row>
				<hr className="my-4" />
				<Row className="mt-4">
					<Col md={8}>
						<Form.Label>Organization Members</Form.Label>
						{members &&
							members.map((assignee, i) => (
								<Row key={assignee}>
									<Col md={7}>
										<Form.Control
											as="select"
											value={assignee._id}
											onChange={(e) => handleInputChange(e, i)}
											required
											className="px-5 mb-3"
										>
											<option value="">--Select--</option>
											{stakeholders &&
												stakeholders.map((stakeholder) => (
													<option key={stakeholder._id} value={stakeholder._id}>
														{stakeholder.firstName} {stakeholder.lastName}
													</option>
												))}
										</Form.Control>
									</Col>
									<Col md={5}>
										{stakeholders && stakeholders.length !== 1 && (
											<Button
												variant="danger"
												className="btn-md mr-3"
												onClick={() => removeHandler(i)}
											>
												<i className="fas fa-trash"></i>
											</Button>
										)}
										{stakeholders && stakeholders.length - 1 === i && (
											<Button className="px-3" onClick={() => addHandler(i)}>
												<i className="fas fa-plus"></i> Stakeholder
											</Button>
										)}
									</Col>
								</Row>
							))}
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
		</BorderContainer>
	);
};

export default AddOrganizationScreen;
