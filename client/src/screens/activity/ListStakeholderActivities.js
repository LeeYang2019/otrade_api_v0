import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
	listStakeholderActivities,
	deleteActivity,
} from '../../actions/activityActions';
import Message from '../../components/Message.js';
import Loader from '../../components/Loader.js';
import FilterBox from '../../components/FilterBox';
import Empty from '../../components/Empty';
import BorderContainer from '../../components/BorderContainer';
import TableHelper from '../../components/TableHelper';

const ListStakeholderActivities = ({ match }) => {
	const stakeholderId = match.params.id;

	const { url } = useRouteMatch();

	//get activities
	const dispatch = useDispatch();
	const activityStakeholderList = useSelector(
		(state) => state.activityStakeholderList
	);
	const {
		loading,
		error,
		stakeholderactivities,
		filtered,
	} = activityStakeholderList;

	const activityDelete = useSelector((state) => state.activityDelete);
	const { success } = activityDelete;

	//useState
	const [message, setMessage] = useState(null);

	useEffect(() => {
		if (success) {
			dispatch(listStakeholderActivities(stakeholderId));
			setMessage('Activity has been successfully deleted');
		} else {
			dispatch(listStakeholderActivities(stakeholderId));
		}
	}, [dispatch, stakeholderId, success, message]);

	//delete activity
	const deleteHandler = (id) => {
		if (window.confirm('Are you sure?')) {
			dispatch(deleteActivity(id));
		}
	};

	return (
		<BorderContainer>
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error}</Message>
			) : (
				<>
					{stakeholderactivities && stakeholderactivities.length === 0 ? (
						<Empty
							itemLink={'/addActivity'}
							url={url}
							type={'Register Activity'}
							group={'activities'}
						/>
					) : (
						<Row className="align-items-center">
							<Col md={8} className="d-flex justify-content-end ml-2 mr-3">
								<FilterBox searchWord={'StakeholderActivities'} />
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
											<Row>
												<Col>
													<p className="mr-3">
														<strong>Activity: </strong>
														<Link
															to={`/project/${stakeholderId}/activity/${activity._id}`}
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
																<strong className="text-success">
																	Complete
																</strong>
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
												</Col>
												<Col
													md={4}
													className="d-flex align-items-center justify-content-end"
												>
													<Button
														variant="danger"
														className="btn-md ml-3"
														onClick={() => deleteHandler(activity._id)}
													>
														<i className="fas fa-trash"></i> Delete
													</Button>
												</Col>
											</Row>
										</td>
									</tr>
							  ))
							: stakeholderactivities &&
							  stakeholderactivities.map((activity) => (
									<tr key={activity._id}>
										<td>
											<Row>
												<Col>
													<p className="mr-3">
														<strong>Activity: </strong>
														<Link
															to={`/project/${stakeholderId}/activity/${activity._id}`}
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
																<strong className="text-success">
																	Complete
																</strong>
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
												</Col>
												<Col
													md={4}
													className="d-flex align-items-center justify-content-end"
												>
													<Button
														variant="danger"
														className="btn-md ml-3"
														onClick={() => deleteHandler(activity._id)}
													>
														<i className="fas fa-trash"></i> Delete
													</Button>
												</Col>
											</Row>
										</td>
									</tr>
							  ))}
					</TableHelper>
				</>
			)}
		</BorderContainer>
	);
};

export default ListStakeholderActivities;
