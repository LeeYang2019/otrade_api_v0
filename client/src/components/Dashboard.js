import React from 'react';
import { Row, Col } from 'react-bootstrap';
import BorderContainer from './BorderContainer';

const Dashboard = () => {
	return (
		<>
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
			<Row className="justify-content-center mt-2">
				<Col>
					<BorderContainer>
						<div className="dashboard-container-bottom">In Development</div>
					</BorderContainer>
				</Col>
			</Row>
		</>
	);
};

export default Dashboard;
