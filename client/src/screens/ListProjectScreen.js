import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message.js';
import Loader from '../components/Loader.js';
// import { listUsers } from '../actions/userActions';
import { listProjects } from '../actions/projectActions';

const ListProjectScreen = ({ history }) => {
	const dispatch = useDispatch();

	const projectList = useSelector((state) => state.projectList);
	const { loading, projects, error } = projectList;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		if (userInfo && userInfo.role === 'admin') {
			dispatch(listProjects());
		} else {
			history.push('/login');
		}
	}, [dispatch, history, userInfo]);

	const deleteHandler = (id) => {};

	return (
		<>
			<h1>Projects</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Table striped bordered hover responsive className="table-sm">
					<thead>
						<tr>
							<th>ID</th>
							<th>Project</th>
							<th>Client</th>
							<th>Assigned</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{projects.map((project) => (
							<tr key={project._id}>
								<td>{project._id}</td>
								<td>{project.projectName}</td>
								<td>{project.projectClient}</td>
								<td>In Development</td>
								<td>
									<LinkContainer to={`/admin/project/${project._id}/edit`}>
										<Button variant="light" className="btn-sm">
											<i className="fas fa-edit"></i>
										</Button>
									</LinkContainer>
									<Button
										variant="danger"
										className="btn-sm"
										onClick={() => deleteHandler(project._id)}
									>
										<i className="fas fa-trash"></i>
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default ListProjectScreen;
