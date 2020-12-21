import React, { useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message.js';
import Loader from '../../components/Loader.js';
import { listUsers } from '../../actions/userActions';
import SearchBox from '../../components/SearchBox';

const ListUserScreen = ({ history }) => {
	const dispatch = useDispatch();

	//get list of users
	const userList = useSelector((state) => state.userList);
	const { loading, error, users } = userList;

	//get logged in user
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		// if logged in user exists and role is admin
		if (userInfo && userInfo.role === 'admin') {
			dispatch(listUsers());
		} else {
			history.push('/login');
		}
	}, [dispatch, history, userInfo]);

	const createUserHandler = () => {};

	const deleteHandler = (id) => {
		console.log('delete');
	};

	return (
		<>
			<Row className="align-items-center">
				<Col md={3}>
					<h1>Users</h1>
				</Col>
				<Col md={7}>
					<Route
						render={({ history }) => (
							<SearchBox history={history} searchWord={'User'} />
						)}
					/>
				</Col>
				<Col className="text-right" md={2}>
					<Link to="/admin/projects" className="btn btn-primary my-3">
						<i className="fas fa-plus"></i> Register User
					</Link>
				</Col>
			</Row>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Table striped bordered hover responsive className="table-sm mt-2">
					<thead className="table table-dark">
						<tr>
							<th>Full Name</th>
							<th>Email</th>
							<th>Telephone</th>
							<th>Role</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user._id}>
								<td>
									<Link to={`/profile/${user._id}`}>
										{user.firstName} {user.lastName}
									</Link>
								</td>
								<td>
									<a href={`mailto:${user.email}`}>{user.email}</a>{' '}
								</td>
								<td></td>
								<td>{user.role}</td>
								<td>
									<LinkContainer to={`/profile/${user._id}`}>
										<Button variant="light" className="btn-sm ml-3">
											<i className="fas fa-edit"></i>
										</Button>
									</LinkContainer>
									<Button
										variant="danger"
										className="btn-sm ml-3"
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
