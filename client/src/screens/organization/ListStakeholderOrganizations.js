import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listStakeholderOrganizations } from '../../actions/organizationAction';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import BorderContainer from '../../components/BorderContainer';
import TableHelper from '../../components/TableHelper';
import Empty from '../../components/Empty';
import FilterBox from '../../components/FilterBox';

const ListStakeholderOrganizations = ({ match }) => {
	const stakeholderId = match.params.id;
	const { url } = useRouteMatch();

	const dispatch = useDispatch();

	//get organizations for stakeholder
	const organizationStakeholderList = useSelector(
		(state) => state.organizationStakeholderList
	);
	const { loading, error, organizations } = organizationStakeholderList;

	useEffect(() => {
		dispatch(listStakeholderOrganizations(stakeholderId));
	}, [dispatch, stakeholderId]);

	return (
		<BorderContainer>
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error}</Message>
			) : (
				<>
					{organizations && organizations.length === 0 ? (
						<Empty
							itemLink={'/addOrganization'}
							url={url}
							type={'Register Organization'}
							group={'organizations'}
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
					</TableHelper>
				</>
			)}
		</BorderContainer>
	);
};

export default ListStakeholderOrganizations;
