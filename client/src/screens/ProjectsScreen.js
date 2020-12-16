import React, { userEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table } from 'react-bootstrap';

const ProjectsScreen = ({ userId }) => {
	return (
		<Table striped bordered hover responsive className="table-sm">
			<thead>
				<tr>
					<th>Project</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>{userId}</td>
				</tr>
			</tbody>
		</Table>
	);
};

export default ProjectsScreen;
