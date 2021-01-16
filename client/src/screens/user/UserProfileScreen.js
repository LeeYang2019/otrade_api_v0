import React, { useEffect } from 'react';
import { NavLink, Link, useRouteMatch, Route, Switch } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader.js';
import { getUserDetails } from '../../actions/userActions';
import EditUser from '../user/EditUser';
import UserProjects from '../project/UserProjects';
import ProfilePic from '../../img/Nhialee_Yang.jpg';

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
							<img src={ProfilePic} alt="profile" className="profile" />
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
								<Col md={10}>
									<strong>{user.email}</strong>
									<br />
									{user.telephone}
									<br />
									<strong>Status: </strong>
									{user.status}
								</Col>
								<Col md={2}>
									<Link
										to="/admin/userList/add"
										className="btn btn-primary my-3"
									>
										<i className="fas fa-edit"></i> Edit User
									</Link>
								</Col>
							</Row>
							<hr />
							<Row>
								<ul className="my-navbar">
									<li>
										<NavLink to={url}>Profile</NavLink>
									</li>
									<li>
										<NavLink to={`${url}/projects`}>Project</NavLink>
									</li>
								</ul>
							</Row>
						</Col>
					</Row>
					<Row>
						<Col md={2}></Col>
						<Col md={10}>
							<Switch>
								<Route
									exact
									path={path}
									render={({ match }) => <EditUser match={match} />}
								/>

								<Route
									exact
									path={`${path}/projects`}
									render={({ match }) => <UserProjects match={match} />}
								/>
							</Switch>
						</Col>
					</Row>
				</>
			)}
		</>
	);
};

export default UserProfileScreen;
