import React, { useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message.js';
import Loader from '../../components/Loader.js';
import { listProjects } from '../../actions/projectActions';
import SearchBox from '../../components/SearchBox';

const ListProjectScreen = ({ history, match }) => {
	const keyword = match.params.keyword;

	const dispatch = useDispatch();

	//list of projects
	const projectList = useSelector((state) => state.projectList);
	const { loading, projects, error } = projectList;

	//get current user information
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		if (userInfo && userInfo.role === 'admin') {
			dispatch(listProjects(keyword));
		} else {
			history.push('/login');
		}
	}, [dispatch, history, userInfo, keyword]);

	//delete project
	const deleteHandler = (id) => {
		console.log('delete');
	};

	return (
		<>
			<Row className="align-items-center">
				<Col md={3}>
					<h1>Projects</h1>
				</Col>
				<Col md={7}>
					<Route
						render={({ history }) => (
							<SearchBox
								history={history}
								searchWord={'Project'}
								searchQueryPath={'/admin/projects/search/'}
								searchQueryEmpty={'/admin/projects'}
							/>
						)}
					/>
				</Col>
				<Col className="text-right" md={2}>
					<Link to="/admin/projects" className="btn btn-primary my-3">
						<i className="fas fa-plus"></i> Register Project
					</Link>
				</Col>
			</Row>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Table hover responsive className="table-sm mt-3">
					<tbody>
						{projects.map((project) => (
							<tr key={project._id}>
								<td>
									<p>
										<strong>Project: </strong>
										<Link to={`/project/${project._id}`}>
											{project.projectName}
										</Link>
										<br />
										Client: <em>{project.projectClient}</em>
										<br />
										Created Date:{' '}
										<strong>{project.createdAt.substring(0, 10)}</strong>
										<br />
										Assigned:{' '}
										{project.assignees.length === 0 ? (
											<strong>No Assignment</strong>
										) : (
											project.assignees.map((a) => a).join(', ')
										)}
									</p>
								</td>
								<td className="text-right pr-4 align-middle">
									<LinkContainer to={`/admin/project/${project._id}/edit`}>
										<Button variant="light" className="btn-md ml-3">
											<i className="fas fa-edit"></i>
										</Button>
									</LinkContainer>
									<Button
										variant="danger"
										className="btn-md ml-3 "
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
