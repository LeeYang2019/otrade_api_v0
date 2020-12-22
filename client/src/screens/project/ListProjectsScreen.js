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
									<td>
										<p>
											<strong>Project: </strong>
											<Link to={`/project/${project._id}`}>
												{project.projectName}
											</Link>
											<br />
											<em>Client:</em> {project.projectClient}
											<br />
											<em>Created Date: </em> {project.createdAt}
											<br />
											<em>Assigned: </em>{' '}
											{project.assignees.map((a) => a).join(', ')}
										</p>
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