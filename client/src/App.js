import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginScreen from './screens/LoginScreen';
// import ProfileScreen from './screens/ProfileScreen';
import LogoutScreen from './screens/LogoutScreen';
import HomeScreen from './screens/HomeScreen';
import ListUserScreen from './screens/ListUserScreen';
import ListProjectScreen from './screens/ListProjectScreen';
import ProjectEditScreen from './screens/ProjectEditScreen';
import LoggedInUserProfileScreen from './screens/LoggedInUserProfileScreen';

const App = () => {
	return (
		<Router>
			<Header />
			<main className="py-3">
				<Container>
					<Route exact path="/login" component={LoginScreen} />
					<Route exact path="/" component={HomeScreen} />
					<Route exact path="/admin/userlist" component={ListUserScreen} />
					<Route exact path="/admin/projects" component={ListProjectScreen} />
					<Route
						exact
						path="/admin/project/:id/edit"
						component={ProjectEditScreen}
					/>
					<Route
						exact
						path="/profile"
						component={LoggedInUserProfileScreen}
					></Route>
					<Route exact path="/logout" component={LogoutScreen} />
				</Container>
			</main>
			<Footer />
		</Router>
	);
};

export default App;
