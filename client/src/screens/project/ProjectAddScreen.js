import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { addProject } from '../../actions/projectActions';
import { PROJECT_ADD_RESET } from '../../constants/projectConstants';
import Loader from '../../components/Loader';
import BorderContainer from '../../components/BorderContainer';

const ProjectAddScreen = ({ history }) => {
	const [projectName, setProjectName] = useState('');
	const [projectClient, setProjectClient] = useState('');
	const [image, setImage] = useState('');
	const [comment, setComment] = useState('');
	const [uploading, setUploading] = useState(false);

	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const projectAdd = useSelector((state) => state.projectAdd);
	const { success } = projectAdd;

	useEffect(() => {
		if (!userInfo || userInfo.role !== 'admin') {
			history.push('/login');
		} else {
			if (success) {
				dispatch({ type: PROJECT_ADD_RESET });
				history.push('/admin/projects');
			}
		}
	}, [dispatch, history, success, userInfo]);

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
		dispatch(
			addProject({
				projectName,
				projectClient,
				image,
				comment,
			})
		);
	};

	return (
		<>
			{/* <Link to="/admin/projects" className="btn btn-primary my-3">
				Back to Project List
			</Link> */}
			<BorderContainer title={'Project'}>
				<Form onSubmit={submitHandler} className="mt-4 mb-3">
					<Row>
						<Col>
							<Form.Group controlId="projectName">
								<Form.Label>Project Name</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter a project name"
									value={projectName}
									onChange={(e) => setProjectName(e.target.value)}
								></Form.Control>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group controlId="projectClient">
								<Form.Label>Project Client</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter a project client"
									value={projectClient}
									onChange={(e) => setProjectClient(e.target.value)}
								></Form.Control>
							</Form.Group>
						</Col>
					</Row>
					<hr />
					<Row>
						<Col>
							<Form.Group controlId="image">
								<Form.Label>Image</Form.Label>
								<Row className="mb-3">
									<Col md={8}>
										<Form.Control
											type="text"
											placeholder="Enter image url"
											value={image}
											onChange={(e) => setImage(e.target.value)}
										></Form.Control>
									</Col>
								</Row>
								<Row>
									<Col md={8}>
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
					<hr />
					<Row className="mt-3">
						<Col>
							<Form.Group controlId="comment">
								<Form.Label>Comments</Form.Label>
								<Form.Control
									as="textarea"
									rows="6"
									value={comment}
									onChange={(e) => setComment(e.target.value)}
								></Form.Control>
							</Form.Group>
						</Col>
					</Row>
					<Row className="mt-3">
						<Col>
							<Button type="submit" variant="primary" className="px-5 mt-3">
								Submit
							</Button>
						</Col>
					</Row>
				</Form>
			</BorderContainer>
		</>
	);
};

export default ProjectAddScreen;
