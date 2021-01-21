import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
	getStakeholderDetails,
	updateStakeholder,
} from '../../actions/stakeholderActions';
import { STAKEHOLDER_UPDATE_RESET } from '../../constants/stakeholderConstants';
import Message from '../../components/Message';
import Loader from '../../components/Loader';

const EditStakeholderScreen = ({ projectId, match }) => {
	const stakeholderId = match.params.id;

	//define states
	const [image, setImage] = useState('');
	const [message, setMessage] = useState(null);
	const [uploading, setUploading] = useState(false);

	const dispatch = useDispatch();

	//get the stakeholder
	const stakeholderDetails = useSelector((state) => state.stakeholderDetails);
	const { loading, error, stakeholder } = stakeholderDetails;

	//get success
	const stakeholderUpdate = useSelector((state) => state.stakeholderUpdate);
	const { success } = stakeholderUpdate;

	console.log(match.params);

	useEffect(() => {
		if (success) {
			setMessage('Stakeholder was successfully updated.');
			dispatch(getStakeholderDetails(stakeholderId));
			dispatch({ type: STAKEHOLDER_UPDATE_RESET });
		} else {
			setImage();
		}
	}, [dispatch, stakeholder, stakeholderId, success]);

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
			setUploading(false);
		}
	};

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			updateStakeholder(
				{
					image,
				},
				stakeholderId
			)
		);
	};

	return (
		<>
			<Form.Label>Stakeholder</Form.Label>
			<hr className="mt-4 mb-4" />
			{message && <Message variant="success">{message}</Message>}
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error}</Message>
			) : (
				<Form onSubmit={submitHandler} className="mt-4 mb-3">
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
					<Button type="submit" variant="primary" className="mt-3 px-5">
						Update
					</Button>
				</Form>
			)}
		</>
	);
};

export default EditStakeholderScreen;
