import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message.js';
import Loader from '../components/Loader.js';

const ActivitiesScreen = ({ projectId }) => {
	return (
		<>
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

export default ActivitiesScreen;
