import React, { useEffect } from 'react';
import { Table, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message.js';
import Loader from '../../components/Loader.js';
import { listUserProjects } from '../../actions/projectActions';
import Project from '../../components/Project';
import BorderContainer from '../../components/BorderContainer';
import TableHelper from '../../components/TableHelper';

const UserProjects = ({ match }) => {
	const userId = match.params.id;

	const dispatch = useDispatch();

	//get projects of user
	const projectUser = useSelector((state) => state.projectUser);
	const { loading, error, projects } = projectUser;

	useEffect(() => {
		dispatch(listUserProjects(userId));
		// eslint-disable-next-line
	}, []);

	return (
		<BorderContainer title={'Projects'}>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="light">{error}</Message>
			) : (
				<TableHelper>
					{projects &&
						projects.map((project) => (
							<tr key={project._id}>
								<td>
									<Project project={project} userId={userId} />
								</td>
							</tr>
						))}
				</TableHelper>
			)}
		</BorderContainer>
	);
};

export default UserProjects;
