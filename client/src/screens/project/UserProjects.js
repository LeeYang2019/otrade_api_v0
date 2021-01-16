import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message.js';
import Loader from '../../components/Loader.js';
import { listUserProjects } from '../../actions/projectActions';
import Project from '../../components/Project';

const UserProjects = ({ history, match }) => {
	const userId = match.params.id;

	console.log('inside userprojects');

	const dispatch = useDispatch();

	//get projects of user
	const projectUser = useSelector((state) => state.projectUser);
	const { loading, error, projects } = projectUser;

	useEffect(() => {
		dispatch(listUserProjects(userId));
		// eslint-disable-next-line
	}, []);

	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="light">{error}</Message>
			) : (
				<>
					<Table hover responsive className="table-sm mt-5">
						<tbody>
							{projects &&
								projects.map((project) => (
									<tr key={project._id}>
										<td className="ml-3">
											<Project project={project} userId={userId} />
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

export default UserProjects;
