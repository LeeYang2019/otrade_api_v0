import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
	getOrganizationDetails,
	updateOrganization,
} from '../../actions/organizationAction';
import { ORGANIZATION_UPDATE_RESET } from '../../constants/organizationConstants';
import Message from '../../components/Message.js';
import Loader from '../../components/Loader.js';
import BorderContainer from '../../components/BorderContainer';
import { setAlert } from '../../actions/alertActions';

const OrganizationScreen = ({ history, match }) => {
	const projectId = match.params.projectId;
	const organizationId = match.params.id;

	const dispatch = useDispatch();

	//get stakeholders
	const stakeholderList = useSelector((state) => state.stakeholderList);

	//get organization
	const organzationDetails = useSelector((state) => state.organizationDetails);
	const { loading, error, organization: orgDetails } = organzationDetails;

	//get success
	const organizationUpdate = useSelector((state) => state.organizationUpdate);
	const { success } = organizationUpdate;

	//define states
	const [organization, setOrganization] = useState('');
	const [division, setDivision] = useState('');
	const [location, setLocation] = useState('');
	const [email, setEmail] = useState('');
	const [telephone, setTelephone] = useState('');
	const [website, setWebsite] = useState('');
	const [stakeholders, setStakeholders] = useState([{ stakeholder: '' }]);

	useEffect(() => {
		if (success) {
			dispatch(getOrganizationDetails(organizationId));
			dispatch({ type: ORGANIZATION_UPDATE_RESET });
		} else {
			if (!orgDetails.name || orgDetails._id !== organizationId) {
				dispatch(getOrganizationDetails(organizationId));
			} else {
				setOrganization(orgDetails.name);
				setDivision(orgDetails.division);
				setLocation(orgDetails.address);
				setEmail(orgDetails.email);
				setTelephone(orgDetails.telephone);
				setWebsite(orgDetails.website);
				setStakeholders(orgDetails.stakeholders);
			}
		}
	}, [dispatch, orgDetails, organizationId, success]);

	//add select field
	const addHandler = () => {
		setStakeholders([...stakeholders, { stakeholder: '' }]);
	};

	//filter out element i
	const removeHandler = (i) => {
		const stakeholderToRemove = stakeholders[i];
		const list = stakeholders.filter((i) => i !== stakeholderToRemove);
		setStakeholders(list);
	};

	//add element to array && provide validation
	const handleInputChange = (e, i) => {
		e.preventDefault();
		const list = [...stakeholders];

		if (
			list.includes(e.target.value) ||
			list.some((item) => item._id === e.target.value)
		) {
			setAlert(
				'Please make sure the same user is not assigned twice.',
				'danger'
			);
		} else {
			list[i] = e.target.value;
			setStakeholders(list);
		}
	};

	//submit form
	const submitHandler = (e) => {
		e.preventDefault();

		dispatch(
			updateOrganization(
				{
					name: organization,
					division,
					address: location,
					email,
					telephone,
					website,
					stakeholders,
					project: projectId,
				},
				organizationId
			)
		);
	};

	return (
		<BorderContainer>
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error}</Message>
			) : (
				<>
					<Form onSubmit={submitHandler} className="mt-4 mb-3">
						<Row>
							<Col md={6}>
								<Form.Group controlId="organization">
									<Form.Label>Organization</Form.Label>
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
									<Form.Label>Division</Form.Label>
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
							<Col md={6}>
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
						<hr />
						<Row className="mt-3 pl-3">
							<Form.Label>Organization Members</Form.Label>
						</Row>
						<Row>
							<Col md={9}>
								{stakeholders &&
									stakeholders.map((assignee, i) => (
										<Row key={assignee._id}>
											<Col md={7}>
												<Form.Control
													as="select"
													value={assignee}
													onChange={(e) => handleInputChange(e, i)}
													className="px-5 mb-3"
												>
													<option value="">--Select--</option>
													{stakeholderList.stakeholders.map((stakeholder) => (
														<option
															key={stakeholder._id}
															value={stakeholder._id}
														>
															{stakeholder.firstName} {stakeholder.lastName}
														</option>
													))}
												</Form.Control>
											</Col>
											<Col md={5}>
												{stakeholders.length !== 1 && (
													<Button
														variant="danger"
														className="btn-md mr-3"
														onClick={() => removeHandler(i)}
													>
														<i className="fas fa-trash"></i>
													</Button>
												)}
												{stakeholders.length - 1 === i && (
													<Button
														className="px-3"
														onClick={() => addHandler(i)}
													>
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
									Update
								</Button>
							</Col>
						</Row>
					</Form>
				</>
			)}
		</BorderContainer>
	);
};

export default OrganizationScreen;
