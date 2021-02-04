import React, { memo, useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { listStakeholders } from '../../actions/stakeholderActions';
import BorderContainer from '../../components/BorderContainer';
import TableHelper from '../../components/TableHelper';
import FilterBox from '../../components/FilterBox';
import Empty from '../../components/Empty';

const StakeholdersList = memo(({ match, keyword = '' }) => {
	const projectId = match.params.id;
	const { url } = useRouteMatch();

	//get stakeholders
	const dispatch = useDispatch();
	const stakeholderList = useSelector((state) => state.stakeholderList);
	const { loading, error, filtered, stakeholders } = stakeholderList;

	//use state
	const [message, setMessage] = useState(null);

	useEffect(() => {
		dispatch(listStakeholders(projectId, keyword));
	}, [dispatch, keyword, projectId]);

	//delete user
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
					{message && <Message>{message}</Message>}
					{!filtered && stakeholders && stakeholders.length === 0 ? (
						<Empty
							itemLink={'/addStakeholder'}
							url={url}
							type={'Register Stakeholder'}
							group={'stakeholders'}
						/>
					) : (
						<Row className="align-items-center">
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
												<Col md={8}>
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
													md={4}
													className="d-flex align-items-center justify-content-around"
												>
													{/* <Link
														to={`${url}/addOrganization`}
														className="btn btn-primary mr-3"
													>
														<i className="fas fa-plus"></i> Organization
													</Link>

													<Link
														to={`${url}/addActivity`}
														className="btn btn-primary mr-5"
													>
														<i className="fas fa-plus"></i> Activity
													</Link> */}

													<LinkContainer to={``}>
														<Button variant="light" className="btn-md mr-5">
															<i className="fas fa-edit"></i> Profile
														</Button>
													</LinkContainer>
													<Button
														variant="danger"
														className="btn-md ml-3"
														onClick={() => deleteHandler(person._id)}
													>
														<i className="fas fa-trash"></i> Profile
													</Button>
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
												<Col md={8}>
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
													md={4}
													className="d-flex align-items-center justify-content-around"
												>
													{/* <Link
														to={`${url}/addOrganization`}
														className="btn btn-primary mr-3"
													>
														<i className="fas fa-plus"></i> Organization
													</Link>

													<Link
														to={`${url}/addActivity`}
														className="btn btn-primary mr-5"
													>
														<i className="fas fa-plus"></i> Activity
													</Link> */}

													<LinkContainer to={``}>
														<Button variant="light" className="btn-md mr-5">
															<i className="fas fa-edit"></i> Profile
														</Button>
													</LinkContainer>
													<Button
														variant="danger"
														className="btn-md ml-3"
														onClick={() => deleteHandler(person._id)}
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

export default StakeholdersList;
