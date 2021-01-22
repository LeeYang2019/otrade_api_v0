import React, { useEffect } from 'react';
import { Route, Link, useRouteMatch } from 'react-router-dom';
import { Table, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listStakeholderOrganizations } from '../../actions/organizationAction';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import SearchBox from '../../components/SearchBox';
import BorderContainer from '../../components/BorderContainer';
import TableHelper from '../../components/TableHelper';

const ListStakeholderOrganizations = ({ match }) => {
	const projectId = match.params.id;
	const { url } = useRouteMatch();

	const dispatch = useDispatch();

	//get organizations for stakeholder
	const organizationStakeholderList = useSelector(
		(state) => state.organizationStakeholderList
	);
	const { loading, error, organizations } = organizationStakeholderList;

	useEffect(() => {
		dispatch(listStakeholderOrganizations(projectId));
	}, [dispatch, projectId]);

	return (
		<BorderContainer>
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
						<Col className="d-flex justify-content-end">
							<Link
								to={`${url}/addOrganization`}
								className="btn btn-primary my-3"
							>
								<i className="fas fa-plus"></i> Register
							</Link>
						</Col>
					</Row>
					<TableHelper>
						{organizations &&
							organizations.map((organization) => (
								<tr key={organization._id}>
									<td>
										<p className="mr-3">
											<strong>Organization: </strong>
											<Link
												to={`/project/${projectId}/organization/${organization._id}`}
											>
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
					</TableHelper>
				</>
			)}
		</BorderContainer>
	);
};

export default ListStakeholderOrganizations;
