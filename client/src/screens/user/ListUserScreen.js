import React, { useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message.js';
import Loader from '../../components/Loader.js';
import { listUsers } from '../../actions/userActions';
import SearchBox from '../../components/SearchBox';

const ListUserScreen = ({ history, match }) => {
	const keyword = match.params.keyword;
	//const pageNumber = match.params.pageNumber || 1;

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
			dispatch(listUsers(keyword));
		} else {
			history.push('/login');
		}
	}, [dispatch, history, userInfo, keyword]);

	//delete user
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
							<SearchBox
								history={history}
								searchWord={'User'}
								searchQueryPath={'/admin/userList/search/'}
								searchQueryEmpty={'/admin/userList'}
							/>
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
				<Table hover responsive className="table-sm mt-3">
					<tbody>
						{users.map((user) => (
							<tr key={user._id}>
								<td>
									<p>
										<strong>User: </strong>
										<Link to={`/profile/${user._id}`}>
											{user.lastName}, {user.firstName}
										</Link>
										<br />
										Email:{' '}
										<em>
											<a href={`mailto:${user.email}`}>{user.email}</a>
										</em>
										<br />
										Role:{' '}
										<strong>
											<em>{user.role}</em>
										</strong>
										<br />
										Created Date:{' '}
										<strong>{user.createdAt.substring(0, 10)}</strong> <br />
									</p>
								</td>
								<td className="text-right pr-4 align-middle">
									<LinkContainer to={`/profile/${user._id}`}>
										<Button variant="light" className="btn-md ml-3 ">
											<i className="fas fa-edit"></i>
										</Button>
									</LinkContainer>
									<Button
										variant="danger"
										className="btn-md ml-3"
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
