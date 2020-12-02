import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Projects from '../components/Project/Projects';
import Users from '../components/User/Users';

const HomeScreen = () => {
	return (
		<Row>
			<Col md={4}>
				<Users />
			</Col>
			<Col md={8}>
				<Projects />
			</Col>
		</Row>
	);
};

export default HomeScreen;
