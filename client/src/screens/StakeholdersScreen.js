import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message.js';
import Loader from '../components/Loader.js';
import { listStakeholders } from '../actions/stakeholderActions';

const StakeholdersScreen = ({ projectId }) => {
	const dispatch = useDispatch();

	//get stakeholders
	const stakeholderList = useSelector((state) => state.stakeholderList);
	const { loading, error, stakeholders } = stakeholderList;

	useEffect(() => {
		dispatch(listStakeholders(projectId));
	}, [dispatch, projectId]);

	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error}</Message>
			) : (
				<Table striped hover responsive className="table-sm mt-3">
					<thead className="table table-dark">
						<tr>
							<th>Full Name</th>
							<th>Email</th>
							<th>Telephone</th>
						</tr>
					</thead>
					<tbody>
						{stakeholders.map((person) => (
							<tr key={person._id}>
								<td>
									{person.firstName} {person.lastName}
								</td>
								<td>{person.email}</td>
								<td>{person.telephone}</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default StakeholdersScreen;
