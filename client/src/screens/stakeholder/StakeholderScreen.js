import React, { useEffect } from 'react';
import { Route, Link, useRouteMatch, NavLink, Switch } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message.js';
import Loader from '../../components/Loader.js';
import { getStakeholderDetails } from '../../actions/stakeholderActions';
import Comments from '../stakeholder/Comments';
import EditStakeholderScreen from './EditStakeholderScreen';
import ListOrganizations from './../organization/ListOrganizations';
import ActivitiesList from './../activity/ActivitiesList';
import ProfilePic2 from '../../img/Nhialee_Yang2.jpg';

const StakeholderScreen = ({ history, match }) => {
	let stakeholderId = match.params.id;
	const { path, url } = useRouteMatch();

	const dispatch = useDispatch();

	//get stakeholder
	const stakeholderDetails = useSelector((state) => state.stakeholderDetails);
	const { loading, error, stakeholder } = stakeholderDetails;

	useEffect(() => {
		dispatch(getStakeholderDetails(stakeholderId));
	}, [dispatch, stakeholderId]);

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
							<img src={ProfilePic2} alt="profile" className="profile" />
						</Col>

						<Col md={10}>
							<Row>
								<Col>
									<h1>
										<strong>
											{stakeholder.firstName} {stakeholder.lastName}
										</strong>
									</h1>
								</Col>
							</Row>
							<Row>
								<Col md={10}>
									<strong>{stakeholder.email}</strong>
									<br />
									{stakeholder.telephone}
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
										<NavLink to={`${url}/dashboard`}>Dashboard</NavLink>
									</li>
									<li>
										<NavLink to={url}>Profile</NavLink>
									</li>
									<li>
										<NavLink to={`${url}/organizations`}>Organizations</NavLink>
									</li>
									<li>
										<NavLink to={`${url}/Activities`}>Activities</NavLink>
									</li>
								</ul>
							</Row>
						</Col>
					</Row>
					<Row>
						<Switch>
							<Route
								exact
								path={path}
								render={({ match }) => <EditStakeholderScreen match={match} />}
							/>

							{/* <Route
								exact
								path={`${path}/projects`}
								render={({ match }) => <UserProjects match={match} />}
							/> */}
						</Switch>
					</Row>
				</>
			)}
		</>
	);
};

export default StakeholderScreen;
