import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { logout } from '../actions/userActions';

const Header = ({ history }) => {
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const logoutHandler = () => {
		dispatch(logout());
	};

	return (
		<header>
			<Navbar expand="md" collapseOnSelect className="py-3">
				<Container>
					<LinkContainer to={userInfo ? `/profile/${userInfo._id}` : '/'}>
						<Navbar.Brand>
							<img
								src="https://i0.wp.com/otrade.ca/wp-content/uploads/2020/08/O-Trade-Logo_90pxH-v2.png?fit=78%2C110&ssl=1"
								alt="otrade company logo"
								className="w-75"
							/>
						</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ml-auto">
							{userInfo ? (
								<NavDropdown title={userInfo.firstName} id="username">
									<LinkContainer to={`/profile/${userInfo._id}`}>
										<NavDropdown.Item>Profile</NavDropdown.Item>
									</LinkContainer>
									<NavDropdown.Item onClick={logoutHandler}>
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							) : (
								<LinkContainer to="/login">
									<Nav.Link>
										<i className="fas fa-user"></i> Sign In
									</Nav.Link>
								</LinkContainer>
							)}
							{userInfo && userInfo.role === 'admin' && (
								<NavDropdown title="Admin" id="adminmenu">
									<LinkContainer to="/admin/userlist">
										<NavDropdown.Item>users</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to="/admin/projects">
										<NavDropdown.Item>projects</NavDropdown.Item>
									</LinkContainer>
								</NavDropdown>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
