import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginScreen from './screens/LoginScreen';
import LogoutScreen from './screens/LogoutScreen';
import HomeScreen from './screens/HomeScreen';
import UserProfileScreen from './screens/user/UserProfileScreen';
import ListUserScreen from './screens/user/ListUserScreen';
import ListProjectScreen from './screens/project/ListProjectScreen';
import ProjectScreen from './screens/project/ProjectScreen';
import StakeholderScreen from './screens/stakeholder/StakeholderScreen';
import ProjectUpdateScreen from './screens/project/ProjectUpdateScreen';
import AdminEditUserProfileScreen from './screens/user/AdminEditUserProfileScreen';

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
					<Route
						exact
						path="/profile/:id/project/:projectId"
						component={ProjectScreen}
					/>
					<Route exact path="/stakeholder/:id" component={StakeholderScreen} />
					<Route exact path="/organization/:id" component={StakeholderScreen} />
					<Route exact path="/activity/:id" component={StakeholderScreen} />

					{/* userList paths */}
					<Route exact path="/admin/userlist" component={ListUserScreen} />
					<Route
						exact
						path="/admin/userlist/search/:keyword" //just keyword
						component={ListUserScreen}
					/>
					<Route
						exact
						path="/admin/userlist/page/:pageNumber" //just pageNumber
						component={ListUserScreen}
					/>
					<Route
						exact
						path="/admin/userlist/search/:keyword/page/:pageNumber" //keyword & pageNumber
						component={ListUserScreen}
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
