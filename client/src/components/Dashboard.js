import React from 'react';
import { Row, Col } from 'react-bootstrap';
import BorderContainer from './BorderContainer';

const Dashboard = () => {
	return (
		<BorderContainer title={'Dashboard'}>
			<Row>
				<Col md={6}>
					<Row></Row>
				</Col>
				<Col md={6}>
					<Row></Row>
				</Col>
			</Row>
		</BorderContainer>
	);
};

export default Dashboard;
