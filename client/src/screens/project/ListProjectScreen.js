import React, { useEffect, useState } from 'react';
import { Route, Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message.js';
import Loader from '../../components/Loader.js';
import { listProjects, deleteProject } from '../../actions/projectActions';
import SearchBox from '../../components/SearchBox';
import Paginate from '../../components/Paginate';
import Project from '../../components/Entity/Project';

const ListProjectScreen = ({ history, match }) => {
	const keyword = match.params.keyword;
	const pageNumber = match.params.pageNumber || 1;

	//get logged in user
	const dispatch = useDispatch();

	//get projects
	const projectList = useSelector((state) => state.projectList);
	const { loading, error, projects, page, pages } = projectList;

	const projectDelete = useSelector((state) => state.projectDelete);
	const { success } = projectDelete;

	//define state
	const [message, setMessage] = useState(null);

	useEffect(() => {
		if (success) {
			dispatch(listProjects(keyword, pageNumber));
		} else {
			dispatch(listProjects(keyword, pageNumber));
		}
	}, [dispatch, history, keyword, pageNumber, success]);

	const deleteHandler = (id) => {
		if (window.confirm('Are you sure?')) {
			dispatch(deleteProject(id));
			setMessage('Project successfully deleted');
		}
	};

	return (
		<>
			<Row className="align-items-center ">
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
					<Link to="/admin/projects/add" className="btn btn-primary my-3">
						<i className="fas fa-plus"></i> Add Project
					</Link>
				</Col>
			</Row>
			{message && <Message>{message}</Message>}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Row>
					<Table responsive className="table-sm mt-3">
						<tbody>
							{projects &&
								projects.map((project) => (
									<tr key={project._id}>
										<td>
											<Project project={project} />
										</td>
										<td className="text-right pr-4 align-middle">
											<LinkContainer
												to={`/admin/project/${project._id}/assign`}
											>
												<Button variant="light" className="btn-md ml-3">
													<i className="fas fa-edit"> Assign</i>
												</Button>
											</LinkContainer>
											<LinkContainer to={`/admin/project/${project._id}/edit`}>
												<Button variant="light" className="btn-md ml-3">
													<i className="fas fa-edit"> Update</i>
												</Button>
											</LinkContainer>
											<Button
												variant="danger"
												className="btn-md ml-3 "
												onClick={() => deleteHandler(project._id)}
											>
												<i className="fas fa-trash"> Delete</i>
											</Button>
										</td>
									</tr>
								))}
						</tbody>
					</Table>
					<Row className="m-auto">
						<Paginate
							pages={pages}
							page={page}
							urlOne={'/admin/projects/search/'}
							urlTwo={'/admin/projects/page/'}
						/>
					</Row>
				</Row>
			)}
		</>
	);
};

export default ListProjectScreen;
