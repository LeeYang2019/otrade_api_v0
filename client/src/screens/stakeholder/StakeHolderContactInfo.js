import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { saveStakeholderInfo } from '../../actions/stakeholderActions';
import BorderContainer from '../../components/BorderContainer';

const StakeholderContactInfo = ({ navigation }) => {
	const stakeholder = useSelector((state) => state.stakeholderSave);
	const { stakeholderInfo } = stakeholder;

	//define states
	const [firstName, setFirstName] = useState(stakeholderInfo.firstName);
	const [lastName, setLastName] = useState(stakeholderInfo.lastName);
	const [telephone, setTelephone] = useState(stakeholderInfo.telephone);
	const [gender, setGender] = useState(stakeholderInfo.gender);
	const [birthdate, setBirthdate] = useState(stakeholderInfo.birthdate);
	const [email, setEmail] = useState(stakeholderInfo.email);
	const [ethnicity, setEthnicity] = useState(stakeholderInfo.ethnicity);

	const [media, setMedia] = useState([{ website: '' }]);

	const dispatch = useDispatch();

	//add input field
	const addHandler = (i) => {
		setMedia([...media, { website: '' }]);
	};

	const removeHandler = (i) => {
		const removeMediaItem = media[i];
		//filter out media item to remove from current list and return a new list
		const list = media.filter((i) => i !== removeMediaItem);
		setMedia(list);
	};

	//handle input change
	const handleInputChange = (e, i) => {
		e.preventDefault();
		const list = [...media];
		list[i] = e.target.value;
		setMedia(list);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			saveStakeholderInfo({
				firstName,
				lastName,
				telephone,
				gender,
				birthdate,
				email,
				ethnicity,
				media,
			})
		);
		navigation.next();
	};

	return (
		<BorderContainer title={'Stakeholder (part 1)'}>
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
					<Col md={4}>
						<Form.Group controlId="gender">
							<Form.Label>Gender</Form.Label>
							<Form.Control
								as="select"
								value={gender}
								required
								onChange={(e) => setGender(e.target.value)}
							>
								<option value="">--Select--</option>
								<option value="male">Male</option>
								<option value="female">Female</option>
								<option value="other">Other</option>
							</Form.Control>
						</Form.Group>
					</Col>
					<Col md={4}>
						<Form.Group controlId="birthdate">
							<Form.Label>BirthDate</Form.Label>
							<Form.Control
								type="date"
								placeholder="Enter birthdate"
								value={birthdate}
								required
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
								required
								onChange={(e) => setEthnicity(e.target.value)}
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
								required
								onChange={(e) => setTelephone(e.target.value)}
							></Form.Control>
						</Form.Group>
					</Col>
				</Row>
				<Row className="mt-4">
					<Col md={9}>
						<Form.Group controlId="media">
							<Form.Label>Social Media</Form.Label>
							{stakeholder &&
								media.map((site, i) => (
									<Row key={i}>
										<Col md={8}>
											<Form.Control
												className="mb-3"
												placeholder="Add Website"
												value={site.website}
												required
												onChange={(e) => handleInputChange(e, i)}
											></Form.Control>
										</Col>
										<Col>
											{media.length !== 1 && (
												<Button
													variant="danger"
													className="btn-md mr-3"
													onClick={() => removeHandler(i)}
												>
													<i className="fas fa-trash"></i>
												</Button>
											)}
											{media.length - 1 === i && (
												<Button className="px-3" onClick={() => addHandler(i)}>
													<i className="fas fa-plus"></i> Add
												</Button>
											)}
										</Col>
									</Row>
								))}
						</Form.Group>
					</Col>
				</Row>
				<Row className="mt-3">
					<Col>
						<Button type="submit" variant="primary" className="px-5 mt-3">
							Continue
						</Button>
					</Col>
				</Row>
			</Form>
		</BorderContainer>
	);
};

export default StakeholderContactInfo;
