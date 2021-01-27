import React, { memo, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listActivities } from '../../actions/activityActions';
import Message from '../../components/Message.js';
import Loader from '../../components/Loader.js';
import BorderContainer from '../../components/BorderContainer';
import TableHelper from '../../components/TableHelper';
import FilterBox from '../../components/FilterBox';

const ActivitiesList = memo(({ match, keyword = '' }) => {
	const projectId = match.params.id;
	const { url } = useRouteMatch();

	//get activities
	const dispatch = useDispatch();
	const activityList = useSelector((state) => state.activityList);
	const { loading, error, activities } = activityList;

	useEffect(() => {
		dispatch(listActivities(projectId));
	}, [dispatch, projectId]);

	return (
		<BorderContainer>
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error}</Message>
			) : (
				<>
					<Row className="align-items-center mt-4 mb-3">
						<Col md={8} className="d-flex justify-content-end ml-2 mr-3">
							<FilterBox searchWord={'Organizations'} />
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
					<TableHelper>
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
					</TableHelper>
				</>
			)}
		</BorderContainer>
	);
});

export default ActivitiesList;
