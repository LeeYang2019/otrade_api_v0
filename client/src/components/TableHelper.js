import React from 'react';
import { Table, Row } from 'react-bootstrap';

const TableHelper = ({ children }) => {
	return (
		<Row className="px-3">
			<Table responsive className="table-sm px-4">
				<tbody>{children}</tbody>
			</Table>
		</Row>
	);
};

export default TableHelper;
