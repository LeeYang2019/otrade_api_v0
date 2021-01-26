import React, { useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { listStakeholders } from '../../actions/stakeholderActions';
import BorderContainer from '../../components/BorderContainer';
import TableHelper from '../../components/TableHelper';
import FilterBox from '../../components/FilterBox';
import Empty from '../../components/Empty';

const StakeholdersList = ({ match, keyword = '' }) => {
	const projectId = match.params.id;

	const { url } = useRouteMatch();

	const dispatch = useDispatch();

	//get stakeholders
	const stakeholderList = useSelector((state) => state.stakeholderList);
	const { loading, error, filtered, stakeholders } = stakeholderList;

	useEffect(() => {
		dispatch(listStakeholders(projectId, keyword));
	}, [dispatch, keyword, projectId]);

	return (
		<BorderContainer title={'Stakeholders'}>
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error}</Message>
			) : (
				<>
					{!filtered && stakeholders && stakeholders.length === 0 ? (
						<Empty
							itemLink={'/addStakeholder'}
							url={url}
							type={'Register Stakeholder'}
						/>
					) : (
						<Row className="align-items-center mt-4 mb-3">
							<Col md={8} className="d-flex justify-content-end ml-2 mr-3">
								<FilterBox searchWord={'Stakeholders'} />
							</Col>
							<Col>
								<Link
									to={`${url}/addStakeholder`}
									className="btn btn-primary ml-2 mb-3"
								>
									<i className="fas fa-plus"></i> Register
								</Link>
							</Col>
						</Row>
					)}
					<TableHelper>
						{filtered
							? filtered.map((person) => (
									<tr key={person._id}>
										<td>
											<Row>
												<Col md={5}>
													<p>
														<strong>Name: </strong>
														<Link to={`/stakeholder/${person._id}`}>
															{person.firstName} {person.lastName}
														</Link>
														<br />
														Email: <em> {person.email}</em>
													</p>
												</Col>

												<Col
													md={7}
													className="d-flex justify-content-start align-items-center"
												>
													<Link
														to={`${url}/addOrganization`}
														className="btn btn-primary org-btn"
													>
														<i className="fas fa-plus"></i> Organization
													</Link>

													<Link
														to={`${url}/addActivity`}
														className="btn btn-primary"
													>
														<i className="fas fa-plus"></i> Activity
													</Link>
												</Col>
											</Row>
										</td>
									</tr>
							  ))
							: stakeholders &&
							  stakeholders.map((person) => (
									<tr key={person._id}>
										<td>
											<Row>
												<Col md={5}>
													<p>
														<strong>Name: </strong>
														<Link to={`/stakeholder/${person._id}`}>
															{person.firstName} {person.lastName}
														</Link>
														<br />
														Email: <em> {person.email}</em>
													</p>
												</Col>

												<Col
													md={7}
													className="d-flex justify-content-start align-items-center"
												>
													<Link
														to={`${url}/addOrganization`}
														className="btn btn-primary org-btn"
													>
														<i className="fas fa-plus"></i> Organization
													</Link>

													<Link
														to={`${url}/addActivity`}
														className="btn btn-primary"
													>
														<i className="fas fa-plus"></i> Activity
													</Link>
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

export default StakeholdersList;
