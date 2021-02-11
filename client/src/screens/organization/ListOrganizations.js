import React, { memo, useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
	listOrganizations,
	deleteOrganization,
} from '../../actions/organizationAction';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import BorderContainer from '../../components/BorderContainer';
import TableHelper from '../../components/TableHelper';
import FilterBox from '../../components/FilterBox';
import Empty from '../../components/Empty';
import Organization from '../../components/Entity/Organization';

const ListOrganizations = memo(({ match }) => {
	const projectId = match.params.id;
	const { url } = useRouteMatch();

	//get organizations
	const dispatch = useDispatch();
	const organizationList = useSelector((state) => state.organizationList);
	const { loading, error, organizations, filtered } = organizationList;

	const organizationDelete = useSelector((state) => state.organizationDelete);
	const { success } = organizationDelete;

	//use state
	const [message, setMessage] = useState(null);

	useEffect(() => {
		if (success) {
			dispatch(listOrganizations(projectId));
			setMessage('Organization has been successfully deleted.');
		} else {
			dispatch(listOrganizations(projectId));
		}
	}, [dispatch, projectId, success, message]);

	//delete user
	const deleteHandler = (id) => {
		if (window.confirm('Are you sure?')) {
			dispatch(deleteOrganization(id));
		}
	};

	return (
		<BorderContainer>
			{message && <Message>{message}</Message>}
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
						<Row className="align-items-center">
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
											<Organization
												url={url}
												entity={organization}
												deleteHandler={deleteHandler}
											/>
										</td>
									</tr>
							  ))
							: organizations &&
							  organizations.map((organization) => (
									<tr key={organization._id}>
										<td>
											<Organization
												url={url}
												entity={organization}
												deleteHandler={deleteHandler}
											/>
										</td>
									</tr>
							  ))}
					</TableHelper>
				</>
			)}
		</BorderContainer>
	);
});

export default ListOrganizations;
