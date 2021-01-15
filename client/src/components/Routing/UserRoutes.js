import React from 'react';
import { Container } from 'react-bootstrap';
import PrivateRoute from '../Routing/PrivateRoute';
import EditUser from '../../screens/user/EditUser';
import UserProfileScreen from '../../screens/user/UserProfileScreen';

const UserRoutes = () => {
	return (
		<Container>
			<PrivateRoute exact path="/user/:userId/edit" component={EditUser} />
			<PrivateRoute exact path="/user/:userId/projects" component={EditUser} />
		</Container>
	);
};

export default UserRoutes;
