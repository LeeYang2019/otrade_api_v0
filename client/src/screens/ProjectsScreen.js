import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message.js';
import Loader from '../components/Loader.js';
import { listUserProjects } from '../actions/projectActions';

const ProjectsScreen = (props) => {
	const dispatch = useDispatch();

	//get logged in user
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	//get projects of user
	const projectUser = useSelector((state) => state.projectUser);
	const { loading, error, projects } = projectUser;

	useEffect(() => {
		if (!userInfo) {
			props.history.push('/login');
		} else {
			dispatch(listUserProjects(props.userId));
		}
	}, [props.history, dispatch, userInfo, props.userId]);

	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error}</Message>
			) : (
				<Table striped bordered hover responsive className="table-sm">
					<thead>
						<tr>
							<th>Project</th>
							<th>Client</th>
							<th>CreateAt</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{projects.map((project) => (
							<tr key={project._id}>
								<td>{project.projectName}</td>
								<td>{project.projectClient}</td>
								<td>{project.createdAt}</td>
								<td>
									<LinkContainer to={`/project/${project._id}`}>
										<Button variant="light" className="btn-lg">
											<i className="fas fa-folder-open"></i>
										</Button>
									</LinkContainer>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default ProjectsScreen;
