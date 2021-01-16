import React, { useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import { Table, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listActivities } from '../../actions/activityActions';
import Message from '../../components/Message.js';
import Loader from '../../components/Loader.js';
import SearchBox from '../../components/SearchBox';

const ActivitiesList = ({ match, keyword = '' }) => {
	const dispatch = useDispatch();

	const projectId = match.params.id;

	//get activities
	const activityList = useSelector((state) => state.activityList);
	const { loading, error, activities } = activityList;

	useEffect(() => {
		dispatch(listActivities(projectId));
	}, [dispatch, projectId]);

	return (
		<>
			<Row className="align-items-center mt-3">
				<Col className="text-left" md={8}>
					<Route
						render={({ history }) => (
							<SearchBox
								history={history}
								searchWord={'Activity'}
								searchQueryPath={`/project/${projectId}/search/`}
								searchQueryEmpty={`/project/${projectId}`}
							/>
						)}
					/>
				</Col>
				<Col className="text-right" md={4}>
					<Link
						to={`/project/${projectId}/addActivity`}
						className="btn btn-primary my-3"
					>
						<i className="fas fa-plus"></i> Register Activity
					</Link>
				</Col>
			</Row>
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error}</Message>
			) : (
				<Table hover responsive className="table-sm mt-3">
					<tbody>
						{activities &&
							activities.map((activity) => (
								<tr key={activity._id}>
									<td>
										<p className="mr-3">
											<strong>Activity: </strong>
											<Link
												to={`/project/${projectId}/activity/${activity._id}`}
											>
												{activity.activity}
											</Link>
											<br />
											Stakeholders: <em> {activity.stakeholders.join('')}</em>
											<br />
											Status:{' '}
											<em>
												{activity.isComplete === 'true' ? (
													<strong className="text-success">Complete</strong>
												) : (
													<strong className="text-warning">In Progress</strong>
												)}
											</em>
											<br />
											Registered Date:{' '}
											<strong>
												{' '}
												{activity.createdAt &&
													activity.createdAt.substring(0, 10)}{' '}
											</strong>
										</p>
									</td>
								</tr>
							))}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default ActivitiesList;
