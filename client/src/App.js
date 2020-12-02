import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginScreen from './screens/LoginScreen';
import LogoutScreen from './screens/LogoutScreen';
import HomeScreen from './screens/HomeScreen';

const App = () => {
	return (
		<Router>
			<Header />
			<main className="py-3">
				<Container>
					<Route path="/login" component={LoginScreen} exact />
					<Route path="/" component={HomeScreen} exact />
					<Route path="/logout" component={LogoutScreen} exact />
				</Container>
			</main>
			<Footer />
		</Router>
	);
};

export default App;
