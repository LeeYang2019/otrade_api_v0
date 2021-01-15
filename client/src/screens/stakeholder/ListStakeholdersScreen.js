import React, { useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import { Table, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import SearchBox from '../../components/SearchBox';
import { listStakeholders } from '../../actions/stakeholderActions';

const ListStakeholdersScreen = ({ projectId, keyword }) => {
	const dispatch = useDispatch();

	//get stakeholders
	const stakeholderList = useSelector((state) => state.stakeholderList);
	const { loading, error, stakeholders } = stakeholderList;

	useEffect(() => {
		dispatch(listStakeholders(projectId, keyword));
	}, [dispatch, keyword, projectId]);

	return (
		<>
			<Row className="align-items-center mt-3">
				<Col className="text-left" md={8}>
					<Route
						render={({ history }) => (
							<SearchBox
								history={history}
								searchWord={'Stakeholder'}
								searchQueryPath={`/project/${projectId}/search/`}
								searchQueryEmpty={`/project/${projectId}`}
							/>
						)}
					/>
				</Col>
				<Col className="text-right" md={4}>
					<Link
						to={`/project/${projectId}/addStakeholder`}
						className="btn btn-primary my-3"
					>
						<i className="fas fa-plus"></i> Register Stakeholder
					</Link>
				</Col>
			</Row>
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error}</Message>
			) : (
				<>
					<Table hover responsive className="table-sm mt-3 overflow-scroll">
						<tbody>
							{stakeholders &&
								stakeholders.map((person) => (
									<tr key={person._id}>
										<td>
											<Row>
												<Col>
													<p>
														<strong>Stakeholder: </strong>
														<Link
															to={`/project/${projectId}/stakeholder/${person._id}`}
														>
															{person.lastName}, {person.firstName}
														</Link>
														<br />
														Email: <em> {person.email}</em>
														<br />
														Telephone: {person.telephone}
														<br />
														Registered Date:{' '}
														<strong>
															{' '}
															{person.createdAt &&
																person.createdAt.substring(0, 10)}{' '}
														</strong>
													</p>
												</Col>
												<Col md={3} className="mt-auto">
													<Link
														to={`/project/${projectId}/addOrganization/stakeholder/${person._id}`}
														className="btn btn-primary my-3"
													>
														<i className="fas fa-plus"></i> Organization
													</Link>
												</Col>
												<Col md={2} className="mt-auto">
													<Link
														to={`/project/${projectId}/addActivity/stakeholder/${person._id}`}
														className="btn btn-primary my-3"
													>
														<i className="fas fa-plus"></i> Activity
													</Link>
												</Col>
											</Row>
										</td>
									</tr>
								))}
						</tbody>
					</Table>
				</>
			)}
		</>
	);
};

export default ListStakeholdersScreen;
