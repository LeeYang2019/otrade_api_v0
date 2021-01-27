import React, { useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listOrganizations } from '../../actions/organizationAction';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import BorderContainer from '../../components/BorderContainer';
import TableHelper from '../../components/TableHelper';
import FilterBox from '../../components/FilterBox';
import Empty from '../../components/Empty';

const ListOrganizations = ({ match }) => {
	const projectId = match.params.id;
	const { url } = useRouteMatch();

	//get organizations
	const dispatch = useDispatch();
	const organizationList = useSelector((state) => state.organizationList);
	const { loading, error, organizations, filtered } = organizationList;

	useEffect(() => {
		dispatch(listOrganizations(projectId));
	}, [dispatch, projectId]);

	return (
		<BorderContainer>
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error}</Message>
			) : (
				<>
					{!filtered && organizations && organizations.length === 0 ? (
						<Empty
							itemLink={'/addOrganization'}
							url={url}
							type={'Register Organization'}
							group={'organizations'}
						/>
					) : (
						<Row className="align-items-center mt-4 mb-3">
							<Col md={8} className="d-flex justify-content-end ml-2 mr-3">
								<FilterBox searchWord={'Organizations'} />
							</Col>
							<Col>
								<Link
									to={`${url}/addOrganization`}
									className="btn btn-primary ml-2 mb-3"
								>
									<i className="fas fa-plus"></i> Register
								</Link>
							</Col>
						</Row>
					)}
					<TableHelper>
						{filtered
							? filtered.map((organization) => (
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
							  ))
							: organizations &&
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
					</TableHelper>
				</>
			)}
		</BorderContainer>
	);
};

export default ListOrganizations;
