import React, { useEffect } from 'react';
import { Route, Link, useRouteMatch, NavLink, Switch } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Comments from '../stakeholder/Comments';
import EditStakeholderScreen from './EditStakeholderScreen';
import EditStakeholderPhoto from './EditStakeholderPhoto';
import ListStakeholderOrganizations from '../organization/ListStakeholderOrganizations';
import ListStakeholderActivities from '../activity/ListStakeholderActivities';
import Message from '../../components/Message.js';
import Loader from '../../components/Loader.js';
import { getStakeholderDetails } from '../../actions/stakeholderActions';

const StakeholderScreen = ({ match }) => {
	//get the stakeholderId passed in
	let stakeholderId = match.params.id;

	//get path and url
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
							<img src={stakeholder.image} alt="profile" className="profile" />
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
								<Col md={8}>
									<strong>{stakeholder.email}</strong>
									<br />
									{stakeholder.telephone}
								</Col>
								<Col className="d-flex justify-content-end">
									<Link
										to={`${url}/photo`}
										className="btn btn-primary my-3 mr-3"
									>
										<i className="fas fa-edit"></i> Photo
									</Link>

									<Link to={url} className="btn btn-primary my-3">
										<i className="fas fa-edit"></i> Profile
									</Link>
								</Col>
							</Row>
							<hr />
							<Row>
								<ul className="my-navbar">
									{/* <li>
										<NavLink to={`${url}/dashboard`}>Dashboard</NavLink>
									</li> */}
									<li>
										<NavLink to={`${url}/comments`}>Comments</NavLink>
									</li>
									<li>
										<NavLink to={`${url}/organizations`}>Organizations</NavLink>
									</li>
									<li>
										<NavLink to={`${url}/activities`}>Activities</NavLink>
									</li>
								</ul>
							</Row>
						</Col>
					</Row>
					<Row>
						<Container>
							<Switch>
								<Route
									exact
									path={path}
									render={({ match }) => (
										<EditStakeholderScreen match={match} />
									)}
								/>
								<Route
									exact
									path={`${path}/profile`}
									render={({ match }) => (
										<EditStakeholderScreen match={match} />
									)}
								/>
								<Route
									exact
									path={`${path}/photo`}
									render={({ match }) => <EditStakeholderPhoto match={match} />}
								/>
								<Route
									exact
									path={`${path}/comments`}
									render={({ match }) => <Comments match={match} />}
								/>
								<Route
									exact
									path={`${path}/organizations`}
									render={({ match }) => (
										<ListStakeholderOrganizations match={match} />
									)}
								/>
								<Route
									exact
									path={`${path}/activities`}
									render={({ match }) => (
										<ListStakeholderActivities match={match} />
									)}
								/>
							</Switch>
						</Container>
					</Row>
				</>
			)}
		</>
	);
};

export default StakeholderScreen;
