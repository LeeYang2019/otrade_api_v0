import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile, getUserDetails } from '../../actions/userActions';
import { USER_PROFILE_UPDATE_RESET } from '../../constants/userConstants';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import BorderContainer from '../../components/BorderContainer';

const EditUserPhoto = ({ match }) => {
	const userId = match.params.id;

	//define states
	const [image, setImage] = useState('');
	const [uploading, setUploading] = useState(false);

	const dispatch = useDispatch();

	//get the user
	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	//get success from user update
	const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
	const { success: successUpdate } = userUpdateProfile;

	useEffect(() => {
		if (successUpdate) {
			dispatch(getUserDetails(userId));
			dispatch({ type: USER_PROFILE_UPDATE_RESET });
		} else {
			setImage(user.image);
		}
	}, [dispatch, userId, user, successUpdate]);

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
		//check password against confirmPassword
		dispatch(
			updateUserProfile({
				id: user._id,
				image,
			})
		);
	};

	return (
		<BorderContainer>
			{error && <Message variant="danger">{error}</Message>}
			{loading && <Loader />}
			<Form onSubmit={submitHandler} className="my-5">
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
				<Row className="mt-3">
					<Col>
						<Button type="submit" variant="primary" className="px-5 mt-3">
							Update
						</Button>
					</Col>
				</Row>
			</Form>
		</BorderContainer>
	);
};

export default EditUserPhoto;
