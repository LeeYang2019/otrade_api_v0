import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const UserNavBar = ({ userId, step1 }) => {
	return (
		<Nav className="justify-content-center mb-4">
			<Nav.Item>
				{step1 && (
					<LinkContainer to={`/user/${userId}/edit`}>
						<Nav.Link>Edit Profile</Nav.Link>
					</LinkContainer>
				)}
			</Nav.Item>
			<Nav.Item>
				<LinkContainer to={`/user/${userId}/projects`}>
					<Nav.Link>Projects</Nav.Link>
				</LinkContainer>
			</Nav.Item>
		</Nav>
	);
};

export default UserNavBar;
