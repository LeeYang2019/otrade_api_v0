import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addActivity, removeActivityInfo } from '../../actions/activityActions';
import BorderContainer from '../../components/BorderContainer';

const AddActivityScreenTwo = ({ match, navigation }) => {
	const projectId = match.params.id;
	const { previous, next } = navigation;

	//get activity success
	const dispatch = useDispatch();
	const activity = useSelector((state) => state.activitySave);
	const { activityInfo } = activity;

	//define states
	const [disPoints, setDispoints] = useState('');
	const [compromise, setcompromise] = useState('');

	//handle submit form
	const submitHandler = (e) => {
		e.preventDefault();

		activityInfo.discussPoints = disPoints;
		activityInfo.compromise = compromise;

		//save to database
		dispatch(addActivity(activityInfo, projectId));

		//clear out localstorage
		dispatch(removeActivityInfo());

		if (compromise === 'Yes') {
			next();
		}
	};

	return (
		<BorderContainer title={'(part 2)'}>
			<Form onSubmit={submitHandler} className="mt-4 mb-3">
				<Form.Group controlId="discussion">
					<Form.Label>Discussion</Form.Label>
					<Form.Group controlId="dispoints">
						<Form.Control
							as="textarea"
							rows="4"
							value={disPoints}
							onChange={(e) => setDispoints(e.target.value)}
						></Form.Control>
					</Form.Group>
				</Form.Group>
				<hr className="my-5" />
				<Form.Group controlId="compromise" className="mb-5">
					<Row>
						<Col md={10}>
							<Form.Label>Is there a compromise?</Form.Label>
						</Col>
						<Col md={2}>
							<Form.Control
								as="select"
								value={compromise}
								onChange={(e) => setcompromise(e.target.value)}
							>
								<option value="">--Select--</option>
								<option value="Yes">Yes</option>
								<option value="No">No</option>
							</Form.Control>
						</Col>
					</Row>
				</Form.Group>
				<Row className="mt-5">
					<Col>
						<Button
							onClick={previous}
							variant="primary"
							className="px-5 mt-3 mr-3"
						>
							Previous
						</Button>
						<Button type="submit" variant="primary" className="px-5 mt-3">
							Continue
						</Button>
					</Col>
				</Row>
			</Form>
		</BorderContainer>
	);
};

export default AddActivityScreenTwo;
