import React from 'react';
import { Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import UserProfileScreen from '../../screens/user/UserProfileScreen';
import UserListScreen from '../../screens/user/UserListScreen';
import ListProjectScreen from '../../screens/project/ListProjectScreen';
import ProjectScreen from '../../screens/project/ProjectScreen';
import StakeholderScreen from '../../screens/stakeholder/StakeholderScreen';
import ProjectUpdateScreen from '../../screens/project/ProjectUpdateScreen';
import AdminEditUserProfileScreen from '../../screens/user/AdminEditUserProfileScreen';
import UserAddScreen from '../../screens/user/UserAddScreen';
import ProjectAddScreen from '../../screens/project/ProjectAddScreen';
import AddStakeholderScreen from '../../screens/stakeholder/AddStakeholderScreen';
import AddStakeholderScreenTwo from '../../screens/stakeholder/AddStakeholderScreenTwo';
import AddOrganizationScreen from '../../screens/organization/AddOrganizationScreen';
import OrganizationScreen from '../../screens/organization/OrganizationScreen';
import AddActivityScreen from '../../screens/activity/AddActivityScreen';
import AddActivityScreenTwo from '../../screens/activity/AddActivityScreenTwo';
import AddActivityScreenThree from '../../screens/activity/AddActivityScreenThree';
import PrivateRoute from '../Routing/PrivateRoute';
import UserRoutes from '../Routing/UserRoutes';
import EditUser from '../../screens/user/EditUser';

const Routes = () => {
	return (
		<Container>
			{/* userProfile paths */}
			<PrivateRoute exact path="/profile/:id" component={UserProfileScreen}>
				<PrivateRoute exact path="/user/:userId/edit" component={EditUser} />
			</PrivateRoute>
			<PrivateRoute
				exact
				path="/project/:projectId"
				component={ProjectScreen}
			/>

			{/*Stakeholder paths*/}
			<PrivateRoute
				exact
				path="/project/:projectId/search/:stakeholder"
				component={ProjectScreen}
			/>
			<PrivateRoute
				exact
				path="/project/:projectId/stakeholder/:id"
				component={StakeholderScreen}
			/>

			{/*Organization paths*/}
			<PrivateRoute
				exact
				path="/project/:projectId/search/:organization"
				component={ProjectScreen}
			/>
			<PrivateRoute
				exact
				path="/project/:projectId/organization/:id"
				component={OrganizationScreen}
			/>

			{/*Activity paths*/}
			<PrivateRoute
				exact
				path="/project/:projectId/search/:activity"
				component={ProjectScreen}
			/>
			<PrivateRoute
				exact
				path="/project/:projectId/activity/:id"
				component={StakeholderScreen}
			/>

			{/* userList paths */}
			<PrivateRoute exact path="/admin/userlist" component={UserListScreen} />
			<PrivateRoute
				exact
				path="/admin/userlist/search/:keyword" //just keyword
				component={UserListScreen}
			/>
			<PrivateRoute
				exact
				path="/admin/userlist/page/:pageNumber" //just pageNumber
				component={UserListScreen}
			/>
			<PrivateRoute
				exact
				path="/admin/userlist/search/:keyword/page/:pageNumber" //keyword & pageNumber
				component={UserListScreen}
			/>
			<PrivateRoute
				exact
				path="/admin/userlist/add" //keyword & pageNumber
				component={UserAddScreen}
			/>

			{/* projectList paths */}
			<PrivateRoute
				exact
				path="/admin/projects"
				component={ListProjectScreen}
			/>
			<PrivateRoute
				exact
				path="/admin/projects/search/:keyword" //just keyword
				component={ListProjectScreen}
			/>
			<PrivateRoute
				exact
				path="/admin/projects/page/:pageNumber" //just pageNumber
				component={ListProjectScreen}
			/>
			<PrivateRoute
				exact
				path="/admin/projects/search/:keyword/page/:pageNumber" //keyword & pageNumber
				component={ListProjectScreen}
			/>
			<PrivateRoute
				exact
				path="/admin/projects/add" //keyword & pageNumber
				component={ProjectAddScreen}
			/>
			<PrivateRoute
				exact
				path="/project/:projectId/addStakeholder" //keyword & pageNumber
				component={AddStakeholderScreen}
			/>
			<PrivateRoute
				exact
				path="/project/:projectId/addStakeholderPart2" //keyword & pageNumber
				component={AddStakeholderScreenTwo}
			/>

			<PrivateRoute
				exact
				path="/project/:projectId/addOrganization" //keyword & pageNumber
				component={AddOrganizationScreen}
			/>
			<PrivateRoute
				exact
				path="/project/:projectId/addOrganization/stakeholder/:stakeholderId" //keyword & pageNumber
				component={AddOrganizationScreen}
			/>
			<PrivateRoute
				exact
				path="/project/:projectId/addActivity" //keyword & pageNumber
				component={AddActivityScreen}
			/>
			<PrivateRoute
				exact
				path="/project/:projectId/addActivityPart2" //keyword & pageNumber
				component={AddActivityScreenTwo}
			/>
			<PrivateRoute
				exact
				path="/project/:projectId/addActivityPart3" //keyword & pageNumber
				component={AddActivityScreenThree}
			/>
			<PrivateRoute
				exact
				path="/project/:projectId/addActivity/stakeholder/:stakeholderId" //keyword & pageNumber
				component={AddActivityScreen}
			/>

			{/* Admin Edit PrivateRoutes */}
			<PrivateRoute
				exact
				path="/admin/project/:id/edit"
				component={ProjectUpdateScreen}
			/>
			<PrivateRoute
				exact
				path="/admin/user/:id/edit"
				component={AdminEditUserProfileScreen}
			/>
			<Route component={UserRoutes} />
		</Container>
	);
};

export default Routes;
