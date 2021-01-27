import React, { memo, useEffect } from 'react';
import { useRouteMatch, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader.js';
import { getUserDetails } from '../../actions/userActions';
import ProfileTop from '../../components/ProfileTop';
import { btnlinks, navbarlinks, routes } from './utilities';

const UserProfileScreen = memo(({ match }) => {
	const userId = match.params.id;

	const { path, url } = useRouteMatch();

	const dispatch = useDispatch();

	// get user
	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	useEffect(() => {
		if (!user.firstName || user._id !== userId) {
			dispatch(getUserDetails(userId));
		}
	}, [dispatch, userId, user]);

	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					<ProfileTop
						url={url}
						path={path}
						profile={user}
						btnlinks={btnlinks}
						navbarlinks={navbarlinks}
					/>
					<Switch>
						{routes.map((item, index) => (
							<Route
								key={index}
								exact
								path={`${path}${item.path}`}
								render={item.component}
							/>
						))}
					</Switch>
				</>
			)}
		</>
	);
});

export default UserProfileScreen;
