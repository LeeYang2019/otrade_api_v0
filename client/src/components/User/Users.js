import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import { listUsers } from '../../actions/userActions';
import Loader from '../Loader';
import Message from '../Message';
import User from './User';

const Users = () => {
	const dispatch = useDispatch();

	const userList = useSelector((state) => state.userList);
	const { loading, users, error } = userList;

	useEffect(() => {
		dispatch(listUsers());
	}, [dispatch]);

	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Table striped bordered hover size="sm">
					<thead>
						<tr>
							<th>User</th>
							<th>Email</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<User user={user} key={user._id} />
						))}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default Users;
