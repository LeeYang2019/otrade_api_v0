import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message.js';
import Loader from '../components/Loader.js';
// import { listUsers } from '../actions/userActions';
import { listProjects } from '../actions/projectActions';
import SearchBox from '../components/SearchBox';

const ListProjectScreen = ({ history }) => {
	const dispatch = useDispatch();

	//list of projects
	const projectList = useSelector((state) => state.projectList);
	const { loading, projects, error } = projectList;

	//get current user information
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		//if logged in user exists and role is admin
		if (userInfo && userInfo.role === 'admin') {
			//get list of projects
			dispatch(listProjects());
		} else {
			//if no logged in user and role not admin
			history.push('/login');
		}
	}, [dispatch, history, userInfo]);

	//create a new project
	const createProjectHandler = () => {};

	//delete project
	const deleteHandler = (id) => {};

	return (
		<>
			<Row className="align-items-center">
				<Col>
					<h1>Projects</h1>
				</Col>
				<Col>
					<Route
						render={({ history }) => (
							<SearchBox history={history} searchWord={'Projects'} />
						)}
					/>
				</Col>
				<Col className="text-right">
					<Button className="my-3" onClick={createProjectHandler}>
						<i className="fas fa-plus"></i> Create Project
					</Button>
				</Col>
			</Row>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Table striped hover responsive className="table-sm">
					<thead className="table table-dark">
						<tr>
							<th>Project</th>
							<th>Client</th>
							<th>Assigned</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{projects.map((project) => (
							<tr key={project._id}>
								<td>{project.projectName}</td>
								<td>{project.projectClient}</td>
								<td>
									{project.assignees.map((assignee) => assignee).join(', ')}
								</td>
								<td>
									<LinkContainer to={`/admin/project/${project._id}/edit`}>
										<Button variant="light" className="btn-sm ml-3">
											<i className="fas fa-edit"></i>
										</Button>
									</LinkContainer>
									<Button
										variant="danger"
										className="btn-sm ml-3"
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
