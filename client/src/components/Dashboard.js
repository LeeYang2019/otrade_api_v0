import React from 'react';
import { Row, Col } from 'react-bootstrap';

const Dashboard = () => {
	return (
		<>
			<Row>
				<h1>Dashboard</h1>
				<hr />
			</Row>
			<Row>
				<Col md={6}>
					<Row></Row>
				</Col>
				<Col md={6}>
					<Row></Row>
				</Col>
			</Row>
		</>
	);
};

export default Dashboard;
