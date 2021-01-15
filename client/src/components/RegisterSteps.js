import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const RegisterSteps = ({ projectId, step1, step2, step3 }) => {
	return (
		<Nav className="justify-content-center mb-4">
			<Nav.Item>
				{step1 ? (
					<LinkContainer to={`/project/${projectId}/addStakeholder`}>
						<Nav.Link>Stakeholder</Nav.Link>
					</LinkContainer>
				) : (
					<Nav.Link disabled>Stakeholder</Nav.Link>
				)}
			</Nav.Item>
			<Nav.Item>
				{step2 ? (
					<LinkContainer to={`/project/${projectId}/addOrganization`}>
						<Nav.Link>Organization</Nav.Link>
					</LinkContainer>
				) : (
					<Nav.Link disabled>Organization</Nav.Link>
				)}
			</Nav.Item>
			<Nav.Item>
				{step3 ? (
					<LinkContainer to={`/project/${projectId}/addActivity`}>
						<Nav.Link>Activity</Nav.Link>
					</LinkContainer>
				) : (
					<Nav.Link disabled>Activity</Nav.Link>
				)}
			</Nav.Item>
		</Nav>
	);
};

export default RegisterSteps;
