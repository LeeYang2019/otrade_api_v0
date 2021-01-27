import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import PrivateRoute from './components/Routing/PrivateRoute';
import UserProfileScreen from './screens/user/UserProfileScreen';
import ProjectScreen from './screens/project/ProjectScreen';
import StakeholderScreen from './screens/stakeholder/StakeholderScreen';
import AddOrganizationScreen from './screens/organization/AddOrganizationScreen';
import OrganizationScreen from './screens/organization/OrganizationScreen';
import StakeholderForm from './screens/stakeholder/StakeHolderForm';
import AdminRoutes from './components/Routing/AdminRoutes';
import ActivityForm from './screens/activity/ActivityForm';

const App = () => {
	return (
		<Router>
			<Header />
			<main className="py-3">
				<Container>
					<Route exact path="/" component={HomeScreen} />
					<Route exact path="/login" component={LoginScreen} />

					{/*Project Routes*/}
					<PrivateRoute path="/profile/:id" component={UserProfileScreen} />
					<PrivateRoute path="/project/:id" component={ProjectScreen} />
					<PrivateRoute
						exact
						path="/project/:id/stakeholders/addStakeholder"
						component={StakeholderForm}
					/>
					<PrivateRoute
						exact
						path="/project/:id/stakeholders/addOrganization"
						component={AddOrganizationScreen}
					/>
					<PrivateRoute
						exact
						path="/project/:id/stakeholders/addActivity"
						component={ActivityForm}
					/>
					<PrivateRoute
						exact
						path="/project/:id/organizations/addOrganization"
						component={AddOrganizationScreen}
					/>
					<PrivateRoute
						exact
						path="/project/:id/organizations/:id/profile"
						component={OrganizationScreen}
					/>
					<PrivateRoute
						exact
						path="/stakeholder/:id/organizations/:id/profile"
						component={OrganizationScreen}
					/>
					<PrivateRoute
						exact
						path="/project/:id/activities/addActivity"
						component={ActivityForm}
					/>

					{/*Stakholder Routes */}
					<PrivateRoute path="/stakeholder/:id" component={StakeholderScreen} />
					<PrivateRoute
						exact
						path="/stakeholder/:id/organizations/addOrganization"
						component={AddOrganizationScreen}
					/>
					<PrivateRoute
						exact
						path="/stakeholder/:id/activities/addActivity"
						component={ActivityForm}
					/>

					{/*Admin Routes */}
					<Route component={AdminRoutes} />
				</Container>
			</main>
			<Footer />
		</Router>
	);
};

export default App;
