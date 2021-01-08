import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { addProject } from '../../actions/projectActions';

const ProjectAddScreen = ({ history }) => {
	const [projectName, setProjectName] = useState('');
	const [projectClient, setProjectClient] = useState('');
	const [comment, setComment] = useState('');

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
				console.log('success');
				history.push('/admin/projects');
			}
		}
	}, [history, success, userInfo]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			addProject({
				projectName,
				projectClient,
				comment,
			})
		);
	};

	return (
		<>
			<Link to="/admin/projects" className="btn btn-primary my-3">
				Back to Project List
			</Link>
			<Container className="w-75">
				<h1>Add Project</h1>
				<hr />
				<Form onSubmit={submitHandler} className="my-4">
					<Row>
						<Col>
							<Form.Group controlId="projectName">
								<Form.Label>Project Name</Form.Label>
								<Form.Control
									type="projectName"
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
									type="projectClient"
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
			</Container>
		</>
	);
};

export default ProjectAddScreen;
