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
import AdminRoutes from './components/Routing/AdminRoutes';

const App = () => {
	return (
		<Router>
			<Header />
			<main className="py-3">
				<Container>
					<Route exact path="/" component={HomeScreen} />
					<Route exact path="/login" component={LoginScreen} />
					<PrivateRoute path="/profile/:id" component={UserProfileScreen} />
					<PrivateRoute path="/project/:id" component={ProjectScreen} />
					<PrivateRoute path="/stakeholder/:id" component={StakeholderScreen} />

					<Route component={AdminRoutes} />
				</Container>
			</main>
			<Footer />
		</Router>
	);
};

export default App;
