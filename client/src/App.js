import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import Routes from './components/Routing/Routes';

const App = () => {
	return (
		<Router>
			<Header />
			<main className="py-3">
				<Switch>
					<Route exact path="/" component={HomeScreen} />
					<Route exact path="/login" component={LoginScreen} />
					<Route component={Routes} />
				</Switch>
			</main>
			<Footer />
		</Router>
	);
};

export default App;
