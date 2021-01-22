import React, { useEffect } from 'react';
import { Route, Link, useRouteMatch } from 'react-router-dom';
import { Table, Row, Col, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import SearchBox from '../../components/SearchBox';
import { listStakeholders } from '../../actions/stakeholderActions';
import BorderContainer from '../../components/BorderContainer';
import TableHelper from '../../components/TableHelper';

const StakeholdersList = ({ match, keyword = '' }) => {
	const projectId = match.params.id;

	const { url } = useRouteMatch();

	const dispatch = useDispatch();

	//get stakeholders
	const stakeholderList = useSelector((state) => state.stakeholderList);
	const { loading, error, stakeholders } = stakeholderList;

	useEffect(() => {
		dispatch(listStakeholders(projectId, keyword));
	}, [dispatch, keyword, projectId]);

	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error}</Message>
			) : (
				<BorderContainer title={'Stakeholders'}>
					<Row className="align-items-center mt-2 mb-3">
						<Col md={2}></Col>
						<Col md={8}>
							<Route
								render={({ history }) => (
									<SearchBox
										history={history}
										searchWord={'Last Name'}
										searchQueryPath={`${url}/search/`}
										searchQueryEmpty={`/project/${projectId}`}
									/>
								)}
							/>
						</Col>
						<Col>
							<Link
								to={`${url}/addStakeholder`}
								className="btn btn-primary my-3"
							>
								<i className="fas fa-plus"></i> Register
							</Link>
						</Col>
					</Row>

					<TableHelper>
						{stakeholders &&
							stakeholders.map((person) => (
								<tr key={person._id}>
									<td>
										<Row>
											<Col md={6}>
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
												md={6}
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
				</BorderContainer>
			)}
		</>
	);
};

export default StakeholdersList;
