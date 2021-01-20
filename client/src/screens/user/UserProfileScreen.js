import React, { useEffect } from 'react';
import { NavLink, Link, useRouteMatch, Route, Switch } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader.js';
import { getUserDetails } from '../../actions/userActions';
import EditUser from '../user/EditUser';
import EditUserPhoto from '../user/EditUserPhoto';
import UserProjects from '../project/UserProjects';

const UserProfileScreen = ({ history, match, location }) => {
	let userId = match.params.id;
	const { path, url } = useRouteMatch();

	const dispatch = useDispatch();

	// get user
	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	useEffect(() => {
		if (!user.firstName || user._id !== userId) {
			dispatch(getUserDetails(userId));
		}
	}, [history, dispatch, userId, user]);

	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					<Row>
						<Col md={2}>
							<img src={user.image} alt="profile" className="profile" />
						</Col>
						<Col md={10}>
							<Row>
								<Col md={12}>
									<h1>
										<strong>
											{user.firstName} {user.lastName}
										</strong>
									</h1>
								</Col>
							</Row>
							<Row>
								<Col md={8}>
									<strong>{user.email}</strong>
									<br />
									{user.telephone}
									<br />
									{user.status === 'active' ? (
										<strong>
											status: <em className="text-success">{user.status}</em>
										</strong>
									) : (
										<strong>
											status: <em className="text-danger">{user.status}</em>
										</strong>
									)}
								</Col>
								<Col className="d-flex justify-content-end">
									<Link
										to={`${url}/profile-photo`}
										className="btn btn-primary my-3 mr-3"
									>
										<i className="fas fa-edit"></i> Photo
									</Link>
									<Link to={`${url}/profile`} className="btn btn-primary my-3">
										<i className="fas fa-edit"></i> Profile
									</Link>
								</Col>
							</Row>
							<hr />
							<Row>
								<ul className="my-navbar">
									<li>
										<NavLink to={`${url}/dashboard`}>Dashboard</NavLink>
									</li>
									<li>
										<NavLink to={`${url}/projects`}>Projects</NavLink>
									</li>
								</ul>
							</Row>
						</Col>
					</Row>
					<Container>
						<Switch>
							<Route
								exact
								path={`${path}/profile`}
								render={({ match }) => <EditUser match={match} />}
							/>
							<Route
								exact
								path={`${path}/profile-photo`}
								render={({ match }) => <EditUserPhoto match={match} />}
							/>
							<Route
								exact
								path={path}
								render={({ match }) => <UserProjects match={match} />}
							/>

							<Route
								exact
								path={`${path}/projects`}
								render={({ match }) => <UserProjects match={match} />}
							/>
						</Switch>
					</Container>
				</>
			)}
		</>
	);
};

export default UserProfileScreen;
