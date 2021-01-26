import React from 'react';
import { Row, Col } from 'react-bootstrap';
import BorderContainer from './BorderContainer';

const Dashboard = () => {
	return (
		<BorderContainer title={'Dashboard'}>
			<Row>
				<Col md={6}>
					<BorderContainer>
						<div className="dashboard-container">In Development</div>
					</BorderContainer>
				</Col>
				<Col md={6}>
					<BorderContainer>
						<div className="dashboard-container">In Development</div>
					</BorderContainer>
				</Col>
			</Row>
			<Row className="justify-content-center">
				<Col>
					<BorderContainer>
						<div className="dashboard-container-bottom">In Development</div>
					</BorderContainer>
				</Col>
			</Row>
		</BorderContainer>
	);
};

export default Dashboard;
