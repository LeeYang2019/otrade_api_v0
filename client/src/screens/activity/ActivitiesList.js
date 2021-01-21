import React, { useEffect } from 'react';
import { Route, Link, useRouteMatch } from 'react-router-dom';
import { Table, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listActivities } from '../../actions/activityActions';
import Message from '../../components/Message.js';
import Loader from '../../components/Loader.js';
import SearchBox from '../../components/SearchBox';
import BorderContainer from '../../components/BorderContainer';

const ActivitiesList = ({ match, keyword = '' }) => {
	const dispatch = useDispatch();

	const projectId = match.params.id;

	const { url } = useRouteMatch();

	console.log(url);

	//get activities
	const activityList = useSelector((state) => state.activityList);
	const { loading, error, activities } = activityList;

	useEffect(() => {
		dispatch(listActivities(projectId));
	}, [dispatch, projectId]);

	return (
		<BorderContainer title={'Activities'}>
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error}</Message>
			) : (
				<>
					<Row className="align-items-center mt-2 mb-3">
						<Col md={2}></Col>
						<Col md={8}>
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
						<Col>
							<Link to={`${url}/addActivity`} className="btn btn-primary my-3">
								<i className="fas fa-plus"></i> Register
							</Link>
						</Col>
					</Row>
					<Row>
						<Table responsive className="table-sm mt-3 overflow-scroll">
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
													Stakeholders:{' '}
													<em> {activity.stakeholders.join('')}</em>
													<br />
													Status:{' '}
													<em>
														{activity.isComplete === 'true' ? (
															<strong className="text-success">Complete</strong>
														) : (
															<strong className="text-warning">
																In Progress
															</strong>
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
					</Row>
				</>
			)}
		</BorderContainer>
	);
};

export default ActivitiesList;
