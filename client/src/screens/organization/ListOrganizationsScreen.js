import React, { useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import SearchBox from '../../components/SearchBox';

const ListOrganizationsScreen = ({ projectId }) => {
	return (
		<>
			<Row className="align-items-center mt-3">
				<Col className="text-left" md={8}>
					<Route
						render={({ history }) => (
							<SearchBox history={history} searchWord={'Organization'} />
						)}
					/>
				</Col>
				<Col className="text-right" md={4}>
					<Link to="/admin/projects" className="btn btn-primary my-3">
						<i className="fas fa-plus"></i> Register Organization
					</Link>
				</Col>
			</Row>
			<Table striped hover responsive className="table-sm mt-3">
				<thead className="table table-dark">
					<tr>
						<th>Full Name</th>
						<th>Email</th>
						<th>Telephone</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{projectId}</td>
						<td>{projectId}</td>
						<td>{projectId}</td>
					</tr>
				</tbody>
			</Table>
		</>
	);
};

export default ListOrganizationsScreen;
