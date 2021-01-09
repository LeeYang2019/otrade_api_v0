import React, { useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import { Table, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listOrganizations } from '../../actions/organizationAction';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import SearchBox from '../../components/SearchBox';

const ListOrganizationsScreen = ({ projectId, keyword }) => {
	const dispatch = useDispatch();

	//get organizations
	const organizationList = useSelector((state) => state.organizationList);
	const { loading, error, organizations } = organizationList;

	console.log(organizations);

	useEffect(() => {
		dispatch(listOrganizations(projectId));
	}, [dispatch, projectId]);

	return (
		<>
			<Row className="align-items-center mt-3">
				<Col className="text-left" md={8}>
					<Route
						render={({ history }) => (
							<SearchBox history={history} searchWord={'Organization'} />
						)}
					/>
				</Col>
				<Col className="text-right" md={4}>
					<Link
						to={`/project/${projectId}/addOrganization`}
						className="btn btn-primary my-3"
					>
						<i className="fas fa-plus"></i> Register Organization
					</Link>
				</Col>
			</Row>
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error}</Message>
			) : (
				<Table hover responsive className="table-sm mt-3">
					<tbody>
						{organizations.map((organization) => (
							<tr key={organization._id}>
								<td>
									<p className="mr-3">
										<strong>Stakeholder: </strong>
										<Link
											to={`/project/${projectId}/organization/${organization._id}/edit`}
										>
											{organization.name}
										</Link>
										<br />
										Address: <em> {organization.address}</em>
										<br />
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
			)}
		</>
	);
};

export default ListOrganizationsScreen;
