import React, { memo, useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listActivities } from '../../actions/activityActions';
import Message from '../../components/Message.js';
import Loader from '../../components/Loader.js';
import BorderContainer from '../../components/BorderContainer';
import TableHelper from '../../components/TableHelper';
import FilterBox from '../../components/FilterBox';
import Empty from '../../components/Empty';

const ActivitiesList = memo(({ match, keyword = '' }) => {
	const projectId = match.params.id;
	const { url } = useRouteMatch();

	//get activities
	const dispatch = useDispatch();
	const activityList = useSelector((state) => state.activityList);
	const { loading, error, activities, filtered } = activityList;

	//useState
	const [message, setMessage] = useState(null);

	useEffect(() => {
		dispatch(listActivities(projectId));
	}, [dispatch, projectId]);

	//delete activity
	const deleteHandler = (id) => {
		if (window.confirm('Are you sure?')) {
			//dispatch(deleteUser(id));
			setMessage(null);
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
						{activities &&
							activities.map((activity) => (
								<tr key={activity._id}>
									<td>
										<Row>
											<Col>
												<p className="mr-3">
													<strong>Activity: </strong>
													<Link
														to={`/project/${projectId}/activities/${activity._id}/profile`}
													>
														{activity.activity}
													</Link>
													<br />
													Created:{' '}
													<strong>
														{activity.createdAt &&
															activity.createdAt.substring(0, 10)}{' '}
													</strong>
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
												</p>
											</Col>
											<Col
												md={4}
												className="d-flex align-items-center justify-content-around"
											>
												<LinkContainer to={``}>
													<Button variant="light" className="btn-md mr-5">
														<i className="fas fa-edit"></i> Profile
													</Button>
												</LinkContainer>
												<Button
													variant="danger"
													className="btn-md ml-3"
													onClick={() => deleteHandler(activity._id)}
												>
													<i className="fas fa-trash"></i> Profile
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
});

export default ActivitiesList;
