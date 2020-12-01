import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './screens/LoginScreen';
import Logout from './screens/LogoutScreen';
import HomeScreen from './screens/HomeScreen';

const App = () => {
	return (
		<Router>
			<Header />
			<main className="py-3">
				<Route path="/login" component={Login} exact />
				<Route path="/" component={HomeScreen} exact />
				<Route path="/logout" component={Logout} exact />
			</main>
			<Footer />
		</Router>
	);
};

export default App;
