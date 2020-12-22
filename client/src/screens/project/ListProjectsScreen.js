import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { Table, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message.js';
import Loader from '../../components/Loader.js';
import { listUserProjects } from '../../actions/projectActions';
import { Link } from 'react-router-dom';

const ListProjectsScreen = ({ history, userId }) => {
	const dispatch = useDispatch();

	//get logged in user
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	//get projects of user
	const projectUser = useSelector((state) => state.projectUser);
	const { loading, error, projects } = projectUser;

	useEffect(() => {
		if (!userInfo) {
			history.push('/login');
		} else {
			dispatch(listUserProjects(userId));
		}
	}, [history, dispatch, userInfo, userId]);

	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error}</Message>
			) : (
				<>
					<Table hover responsive className="table-sm mt-5">
						<tbody>
							{projects.map((project) => (
								<tr key={project._id}>
									<td className="ml-3">
										<Row>
											<Col>
												<p>
													<strong>Project: </strong>
													<Link
														to={`/profile/${userId}/project/${project._id}`}
													>
														{project.projectName}
													</Link>
													<br />
													Client: <em>{project.projectClient}</em>
													<br />
													Created Date:{' '}
													<strong>{project.createdAt.substring(0, 10)}</strong>
												</p>
											</Col>
											<Col className="text-right">
												<p className="mr-3">
													<strong>Status: </strong>
													Active
												</p>
											</Col>
										</Row>
										<Row>
											<Col>
												<p>
													Assigned: {project.assignees.map((a) => a).join(', ')}
												</p>
											</Col>
										</Row>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</>
			)}
		</>
	);
};

export default ListProjectsScreen;
