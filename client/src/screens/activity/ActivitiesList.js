import React, { memo, useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listActivities, deleteActivity } from '../../actions/activityActions';
import Message from '../../components/Message.js';
import Loader from '../../components/Loader.js';
import BorderContainer from '../../components/BorderContainer';
import TableHelper from '../../components/TableHelper';
import FilterBox from '../../components/FilterBox';
import Empty from '../../components/Empty';
import Activity from '../../components/Entity/Activity';

const ActivitiesList = memo(({ match, keyword = '' }) => {
	const projectId = match.params.id;
	const { url } = useRouteMatch();

	//get activities
	const dispatch = useDispatch();
	const activityList = useSelector((state) => state.activityList);
	const { loading, error, activities, filtered } = activityList;

	const activityDelete = useSelector((state) => state.activityDelete);
	const { success } = activityDelete;

	//useState
	const [message, setMessage] = useState(null);

	useEffect(() => {
		if (success) {
			dispatch(listActivities(projectId));
			setMessage('Activity has been successfully deleted');
		} else {
			dispatch(listActivities(projectId));
		}
	}, [dispatch, projectId, success, message]);

	//delete activity
	const deleteHandler = (id) => {
		if (window.confirm('Are you sure?')) {
			dispatch(deleteActivity(id));
		}
	};

	return (
		<BorderContainer>
			{message && <Message variant="primary">{message}</Message>}
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error}</Message>
			) : (
				<>
					{!filtered && activities && activities.length === 0 ? (
						<Empty
							itemLink={'/addActivity'}
							url={url}
							type={'Register Activity'}
							group={'activities'}
						/>
					) : (
						<Row className="align-items-center">
							<Col md={8} className="d-flex justify-content-end ml-2 mr-3">
								<FilterBox searchWord={'Activities'} />
							</Col>
							<Col>
								<Link
									to={`${url}/addActivity`}
									className="btn btn-primary ml-2 mb-3"
								>
									<i className="fas fa-plus"></i> Register
								</Link>
							</Col>
						</Row>
					)}
					<TableHelper>
						{filtered
							? filtered.map((activity) => (
									<tr key={activity._id}>
										<td>
											<Activity
												url={url}
												entity={activity}
												deleteHandler={deleteHandler}
											/>
										</td>
									</tr>
							  ))
							: activities &&
							  activities.map((activity) => (
									<tr key={activity._id}>
										<td>
											<Activity
												url={url}
												entity={activity}
												deleteHandler={deleteHandler}
											/>
										</td>
									</tr>
							  ))}
					</TableHelper>
				</>
			)}
		</BorderContainer>
	);
});

export default ActivitiesList;
