import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message.js';
import Loader from '../components/Loader.js';
import { listUsers } from '../actions/userActions';

const ListUserScreen = ({ history }) => {
	const dispatch = useDispatch();
	const userList = useSelector((state) => state.userList);
	const { loading, error, users } = userList;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	console.log(users);

	useEffect(() => {
		if (userInfo && userInfo.role === 'admin') {
			dispatch(listUsers());
		} else {
			history.push('/login');
		}
	}, [dispatch, history, userInfo]);

	const deleteHandler = (id) => {
		console.log('delete');
	};

	return (
		<>
			<h1>Users</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Table striped bordered hover responsive className="table-sm">
					<thead>
						<tr>
							<th>ID</th>
							<th>FirstName</th>
							<th>LastName</th>
							<th>Email</th>
							<th>Role</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user._id}>
								<td>{user._id}</td>
								<td>{user.firstName}</td>
								<td>{user.lastName}</td>
								<td>
									<a href={`mailto:${user.email}`}>{user.email}</a>{' '}
								</td>
								<td>{user.role}</td>
								<td>
									<LinkContainer to={`/profile`}>
										<Button variant="light" className="btn-sm">
											<i className="fas fa-edit"></i>
										</Button>
									</LinkContainer>
									<Button
										variant="danger"
										className="btn-sm"
										onClick={() => deleteHandler(user._id)}
									>
										<i className="fas fa-trash"></i>
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default ListUserScreen;
