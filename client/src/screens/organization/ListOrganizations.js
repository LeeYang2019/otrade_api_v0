import React, { useEffect } from 'react';
import { Route, Link, useRouteMatch } from 'react-router-dom';
import { Table, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listOrganizations } from '../../actions/organizationAction';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import SearchBox from '../../components/SearchBox';
import BorderContainer from '../../components/BorderContainer';

const ListOrganizations = ({ match }) => {
	const projectId = match.params.id;
	const { url } = useRouteMatch();

	const dispatch = useDispatch();

	//get organizations
	const organizationList = useSelector((state) => state.organizationList);
	const { loading, error, organizations } = organizationList;

	useEffect(() => {
		dispatch(listOrganizations(projectId));
	}, [dispatch, projectId]);

	return (
		<BorderContainer title={'Organizations'}>
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
										searchWord={'Organization'}
										searchQueryPath={`/project/${projectId}/search/`}
										searchQueryEmpty={`/project/${projectId}`}
									/>
								)}
							/>
						</Col>
						<Col>
							<Link
								to={`${url}/addOrganization`}
								className="btn btn-primary my-3"
							>
								<i className="fas fa-plus"></i> Register
							</Link>
						</Col>
					</Row>
					<Row>
						<Table responsive className="table-sm mt-3 overflow-scroll">
							<tbody>
								{organizations &&
									organizations.map((organization) => (
										<tr key={organization._id}>
											<td>
												<p className="mr-3">
													<strong>Organization: </strong>
													<Link to={`${url}/${organization._id}/profile`}>
														{organization.name}
													</Link>
													<br />
													Email: <em> {organization.email}</em>
													<br />
													Telephone: {organization.telephone}
													<br />
													Registered Date:{' '}
													<strong>
														{' '}
														{organization.createdAt &&
															organization.createdAt.substring(0, 10)}{' '}
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

export default ListOrganizations;
