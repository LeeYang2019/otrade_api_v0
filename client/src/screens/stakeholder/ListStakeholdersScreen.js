import React, { useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import SearchBox from '../../components/SearchBox';
import { listStakeholders } from '../../actions/stakeholderActions';

const ListStakeholdersScreen = ({ projectId }) => {
	const dispatch = useDispatch();

	//get stakeholders
	const stakeholderList = useSelector((state) => state.stakeholderList);
	const { loading, error, stakeholders } = stakeholderList;

	useEffect(() => {
		dispatch(listStakeholders(projectId));
	}, [dispatch, projectId]);

	const createProjectHandler = () => {};

	return (
		<>
			<Row className="align-items-center mt-3">
				<Col className="text-left" md={8}>
					<Route
						render={({ history }) => (
							<SearchBox history={history} searchWord={'Stakeholder'} />
						)}
					/>
				</Col>
				<Col className="text-right" md={4}>
					<Link to="/admin/projects" className="btn btn-primary my-3">
						<i className="fas fa-plus"></i> Register Stakeholder
					</Link>
				</Col>
			</Row>
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error}</Message>
			) : (
				<Table hover responsive className="table-sm mt-3">
					<hr className="mx-3" />
					<tbody>
						{stakeholders.map((person) => (
							<tr key={person._id}>
								<p className="mr-3">
									<strong>Stakeholder: </strong>
									<Link to={`/stakeholder/${person._id}`}>
										{person.lastName}, {person.firstName}
									</Link>
									<br />
									<em>Email: </em> {person.email}
									<br />
									<em>Telephone: </em> {person.telephone}
									<br />
									<em>Registered Date: </em> {person.createdAt}
									<hr />
								</p>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default ListStakeholdersScreen;