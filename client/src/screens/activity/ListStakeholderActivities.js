import React, { useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listStakeholderActivities } from '../../actions/activityActions';
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
	const { loading, error, stakeholderactivities } = activityStakeholderList;

	console.log(stakeholderactivities);
	console.log(error);

	useEffect(() => {
		dispatch(listStakeholderActivities(stakeholderId));
	}, [dispatch, stakeholderId]);

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
					)}
					<TableHelper>
						{stakeholderactivities &&
							stakeholderactivities.map((activity) => (
								<tr key={activity._id}>
									<td>
										<p className="mr-3">
											<strong>Activity: </strong>
											<Link
												to={`/project/${stakeholderId}/activity/${activity._id}`}
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
};

export default ListStakeholderActivities;
