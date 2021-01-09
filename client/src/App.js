import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginScreen from './screens/LoginScreen';
import LogoutScreen from './screens/LogoutScreen';
import HomeScreen from './screens/HomeScreen';
import UserProfileScreen from './screens/user/UserProfileScreen';
import UserListScreen from './screens/user/UserListScreen';
import ListProjectScreen from './screens/project/ListProjectScreen';
import ProjectScreen from './screens/project/ProjectScreen';
import StakeholderScreen from './screens/stakeholder/StakeholderScreen';
import ProjectUpdateScreen from './screens/project/ProjectUpdateScreen';
import AdminEditUserProfileScreen from './screens/user/AdminEditUserProfileScreen';
import UserAddScreen from './screens/user/UserAddScreen';
import ProjectAddScreen from './screens/project/ProjectAddScreen';
import AddStakeholderScreen from './screens/stakeholder/AddStakeholderScreen';
import AddOrganizationScreen from './screens/organization/AddOrganizationScreen';
import OrganizationScreen from './screens/organization/OrganizationScreen';
import AddActivityScreen from './screens/activity/AddActivityScreen';

const App = () => {
	return (
		<Router>
			<Header />
			<main className="py-3">
				<Container>
					<Route exact path="/login" component={LoginScreen} />
					<Route exact path="/" component={HomeScreen} />

					{/* userProfile paths */}
					<Route exact path="/profile/:id" component={UserProfileScreen} />
					<Route exact path="/project/:projectId" component={ProjectScreen} />

					{/*Stakeholder paths*/}
					<Route
						exact
						path="/project/:projectId/search/:stakeholder"
						component={ProjectScreen}
					/>
					<Route
						exact
						path="/project/:projectId/stakeholder/:id"
						component={StakeholderScreen}
					/>

					{/*Organization paths*/}
					<Route
						exact
						path="/project/:projectId/organization/:id/edit"
						component={OrganizationScreen}
					/>

					{/*Activity paths*/}
					<Route exact path="/activity/:id" component={StakeholderScreen} />

					{/* userList paths */}
					<Route exact path="/admin/userlist" component={UserListScreen} />
					<Route
						exact
						path="/admin/userlist/search/:keyword" //just keyword
						component={UserListScreen}
					/>
					<Route
						exact
						path="/admin/userlist/page/:pageNumber" //just pageNumber
						component={UserListScreen}
					/>
					<Route
						exact
						path="/admin/userlist/search/:keyword/page/:pageNumber" //keyword & pageNumber
						component={UserListScreen}
					/>
					<Route
						exact
						path="/admin/userlist/add" //keyword & pageNumber
						component={UserAddScreen}
					/>

					{/* projectList paths */}
					<Route exact path="/admin/projects" component={ListProjectScreen} />
					<Route
						exact
						path="/admin/projects/search/:keyword" //just keyword
						component={ListProjectScreen}
					/>
					<Route
						exact
						path="/admin/projects/page/:pageNumber" //just pageNumber
						component={ListProjectScreen}
					/>
					<Route
						exact
						path="/admin/projects/search/:keyword/page/:pageNumber" //keyword & pageNumber
						component={ListProjectScreen}
					/>
					<Route
						exact
						path="/admin/projects/add" //keyword & pageNumber
						component={ProjectAddScreen}
					/>
					<Route
						exact
						path="/project/:projectId/addStakeholder" //keyword & pageNumber
						component={AddStakeholderScreen}
					/>
					<Route
						exact
						path="/project/:projectId/addOrganization" //keyword & pageNumber
						component={AddOrganizationScreen}
					/>
					<Route
						exact
						path="/project/:projectId/addOrganization/stakeholder/:stakeholderId" //keyword & pageNumber
						component={AddOrganizationScreen}
					/>
					<Route
						exact
						path="/project/:projectId/addActivity" //keyword & pageNumber
						component={AddActivityScreen}
					/>
					<Route
						exact
						path="/project/:projectId/addActivity/stakeholder/:stakeholderId" //keyword & pageNumber
						component={AddActivityScreen}
					/>

					{/* Admin Edit Routes */}
					<Route
						exact
						path="/admin/project/:id/edit"
						component={ProjectUpdateScreen}
					/>
					<Route
						exact
						path="/admin/user/:id/edit"
						component={AdminEditUserProfileScreen}
					/>

					<Route exact path="/logout" component={LogoutScreen} />
				</Container>
			</main>
			<Footer />
		</Router>
	);
};

export default App;
