import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Message from '../../components/Message.js';
import Loader from '../../components/Loader.js';
import { listUserProjects } from '../../actions/projectActions';
import Project from '../../components/Project';
import BorderContainer from '../../components/BorderContainer';
import TableHelper from '../../components/TableHelper';
import FilterBox from '../../components/FilterBox';

const UserProjects = memo(({ match }) => {
	const userId = match.params.id;

	const dispatch = useDispatch();
	const projectUser = useSelector((state) => state.projectUser);
	const { loading, error, projects, filtered } = projectUser;

	useEffect(() => {
		dispatch(listUserProjects(userId));
		// eslint-disable-next-line
	}, []);

	return (
		<BorderContainer>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="light">{error}</Message>
			) : (
				<>
					{/* <Row className="align-items-center ml-2 mr-3">
						<Col md={8} className="d-flex justify-content-end">
							<FilterBox searchWord={'Projects'} />
						</Col>
					</Row> */}
					<TableHelper>
						{filtered
							? filtered.map((project) => (
									<tr key={project._id}>
										<td>
											<Project project={project} userId={userId} />
										</td>
									</tr>
							  ))
							: projects &&
							  projects.map((project) => (
									<tr key={project._id}>
										<td>
											<Project project={project} userId={userId} />
										</td>
									</tr>
							  ))}
					</TableHelper>
				</>
			)}
		</BorderContainer>
	);
});

export default UserProjects;
