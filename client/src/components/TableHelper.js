import React from 'react';
import { Table, Row } from 'react-bootstrap';

const TableHelper = ({ children }) => {
	return (
		<Row className="px-3">
			<Table responsive className="table-sm pr-3 pl-3">
				<tbody>{children}</tbody>
			</Table>
		</Row>
	);
};

export default TableHelper;
