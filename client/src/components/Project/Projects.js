import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import { listProjects } from '../../actions/projectActions';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import Project from '../Project/Project';

const Projects = () => {
	const dispatch = useDispatch();

	const projectList = useSelector((state) => state.projectList);
	const { loading, projects, error } = projectList;

	useEffect(() => {
		dispatch(listProjects());
	}, [dispatch]);
	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Table striped bordered hover size="sm">
					<thead>
						<tr>
							<th>Name</th>
							<th>Client</th>
						</tr>
					</thead>
					<tbody>
						{projects.map((project) => (
							<Project project={project} key={project._id} />
						))}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default Projects;
