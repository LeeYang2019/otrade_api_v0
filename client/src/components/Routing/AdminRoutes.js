import React from 'react';
import { Switch } from 'react-router-dom';
import UserListScreen from '../../screens/user/UserListScreen';
import ListProjectScreen from '../../screens/project/ListProjectScreen';
import ProjectEditScreen from '../../screens/project/ProjectEditScreen';
import AdminEditUserProfileScreen from '../../screens/user/AdminEditUserProfileScreen';
import UserAddScreen from '../../screens/user/UserAddScreen';
import ProjectAddScreen from '../../screens/project/ProjectAddScreen';
import AdminPrivateRoute from '../Routing/AdminPrivateRoute';
import Assignment from '../Assignment';

const AdminRoutes = () => {
	return (
		<Switch>
			{/* USER PATHS */}
			<AdminPrivateRoute
				exact
				path="/admin/userlist"
				component={UserListScreen}
			/>
			<AdminPrivateRoute
				exact
				path="/admin/userlist/search/:keyword"
				component={UserListScreen}
			/>
			<AdminPrivateRoute
				exact
				path="/admin/userlist/page/:pageNumber"
				component={UserListScreen}
			/>
			<AdminPrivateRoute
				exact
				path="/admin/userlist/search/:keyword/page/:pageNumber"
				component={UserListScreen}
			/>
			<AdminPrivateRoute
				exact
				path="/admin/userlist/add"
				component={UserAddScreen}
			/>
			<AdminPrivateRoute
				exact
				path="/admin/user/:id/edit"
				component={AdminEditUserProfileScreen}
			/>

			{/*PROJECT PATHS */}
			<AdminPrivateRoute
				exact
				path="/admin/projects"
				component={ListProjectScreen}
			/>
			<AdminPrivateRoute
				exact
				path="/admin/projects/search/:keyword"
				component={ListProjectScreen}
			/>
			<AdminPrivateRoute
				exact
				path="/admin/projects/page/:pageNumber"
				component={ListProjectScreen}
			/>
			<AdminPrivateRoute
				exact
				path="/admin/projects/search/:keyword/page/:pageNumber"
				component={ListProjectScreen}
			/>
			<AdminPrivateRoute
				exact
				path="/admin/projects/add"
				component={ProjectAddScreen}
			/>
			<AdminPrivateRoute
				exact
				path="/admin/project/:id/edit"
				component={ProjectEditScreen}
			/>
			<AdminPrivateRoute
				exact
				path="/admin/project/:id/assign"
				component={Assignment}
			/>
		</Switch>
	);
};

export default AdminRoutes;
