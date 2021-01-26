import React, { useEffect, useState } from 'react';
import { Route, Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message.js';
import Loader from '../../components/Loader.js';
import { listUsers, deleteUser } from '../../actions/userActions';
import SearchBox from '../../components/SearchBox';
import Paginate from '../../components/Paginate';

const UserListScreen = ({ history, match }) => {
	const keyword = match.params.keyword;
	const pageNumber = match.params.pageNumber || 1;

	const [message, setMessage] = useState(null);

	const dispatch = useDispatch();

	//get logged in user
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	//get list of users
	const userList = useSelector((state) => state.userList);
	const { loading, error, users, page, pages } = userList;

	//get success from userDelete reducer
	const userDelete = useSelector((state) => state.userDelete);
	const { success } = userDelete;

	useEffect(() => {
		if (userInfo && userInfo.role !== 'admin') {
			history.push('/login');
		} else {
			if (success) {
				history.push('/admin/userList');
			}
			dispatch(listUsers(keyword, pageNumber));
		}
	}, [dispatch, history, userInfo, keyword, pageNumber, success]);

	//delete user
	const deleteHandler = (id) => {
		if (id === userInfo._id) {
			setMessage('You cannot delete yourself');
		} else {
			if (window.confirm('Are you sure?')) {
				dispatch(deleteUser(id));
				setMessage(null);
			}
		}
	};

	return (
		<>
			<Row className="align-items-center ">
				<Col md={3}>
					<h1>Users</h1>
				</Col>
				<Col md={7}>
					<Route
						render={({ history }) => (
							<SearchBox
								history={history}
								searchWord={'LastName'}
								searchQueryPath={'/admin/userList/search/'}
								searchQueryEmpty={'/admin/userList'}
							/>
						)}
					/>
				</Col>
				<Col md={2} className="text-right">
					<Link to="/admin/userList/add" className="btn btn-primary my-3">
						<i className="fas fa-plus"></i> Add User
					</Link>
				</Col>
			</Row>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Row>
					{message && <Message variant="danger">{message}</Message>}
					<Table responsive className="table-sm mt-3">
						<tbody>
							{users &&
								users.map((user) => (
									<tr key={user._id}>
										<td>
											<Row>
												<Col md={6}>
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
														Telephone:{' '}
														<strong>
															<em>{user.telephone}</em>
														</strong>
														<br />
														Role:{' '}
														<strong>
															<em>{user.role}</em>
														</strong>
														<br />
													</p>
												</Col>
												<Col md={3}>
													<p>
														<strong>Status: </strong>
														{user.status === 'active' ? (
															<strong>
																<em className="text-success">{user.status}</em>
															</strong>
														) : (
															<strong>
																<em className="text-danger">{user.status}</em>
															</strong>
														)}
														<br />
														Joined:{' '}
														<strong>
															{user.createdAt.substring(0, 10)}
														</strong>{' '}
														<br />
													</p>
												</Col>
											</Row>
										</td>
										<td className="text-right pr-4 align-middle">
											<LinkContainer to={`/admin/user/${user._id}/edit`}>
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
					<Row className="m-auto">
						<Paginate
							pages={pages}
							page={page}
							urlOne={'/admin/userList/search/'}
							urlTwo={'/admin/userList/page/'}
						/>
					</Row>
				</Row>
			)}
		</>
	);
};

export default UserListScreen;
