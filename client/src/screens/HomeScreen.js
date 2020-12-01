import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Table } from 'react-bootstrap';
import { listProjects } from '../actions/projectActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Project from '../components/Project';

const HomeScreen = () => {
	const dispatch = useDispatch();

	const projectList = useSelector((state) => state.projectList);
	const {
		projects: { data },
	} = projectList;

	useEffect(() => {
		dispatch(listProjects());
	}, [dispatch]);

	return (
		<Row>
			<Col md={3}>User</Col>
			<Col md={9}>
				<Table responsive>
					<tr>
						<th>Name</th>
					</tr>
					<tbody>something here</tbody>
				</Table>
			</Col>
		</Row>
	);
};

export default HomeScreen;
