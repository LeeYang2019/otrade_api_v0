import React, { useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message.js';
import Loader from '../../components/Loader.js';
import SearchBox from '../../components/SearchBox';

const ListActivitiesScreen = ({ projectId }) => {
	const dispatch = useDispatch();

	//get organizations

	useEffect(() => {
		//dispatch(listStakeholders(projectId));
	}, [dispatch, projectId]);

	return (
		<>
			<Row className="align-items-center mt-3">
				<Col className="text-left" md={8}>
					<Route
						render={({ history }) => (
							<SearchBox history={history} searchWord={'Activity'} />
						)}
					/>
				</Col>
				<Col className="text-right" md={4}>
					<Link
						to={`/project/${projectId}/addActivity`}
						className="btn btn-primary my-3"
					>
						<i className="fas fa-plus"></i> Register Activity
					</Link>
				</Col>
			</Row>
			{/* {loading ? (
				<Loader />
			) : error ? (
				<Message>{error}</Message>
			) : (
				<Table hover responsive className="table-sm mt-3">
					<tbody>
						{stakeholders.map((person) => (
							<tr key={person._id}>
								<td>
									<p className="mr-3">
										<strong>Stakeholder: </strong>
										<Link to={`/stakeholder/${person._id}`}>
											{person.lastName}, {person.firstName}
										</Link>
										<br />
										Email: <em> {person.email}</em>
										<br />
										Telephone: {person.telephone}
										<br />
										Registered Date:{' '}
										<strong>
											{' '}
											{person.createdAt &&
												person.createdAt.substring(0, 10)}{' '}
										</strong>
									</p>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)} */}
		</>
	);
};

export default ListActivitiesScreen;
