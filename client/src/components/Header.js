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
		//history.push('/login');
	};

	return (
		<header>
			<Navbar
				bg="primary"
				variant="dark"
				expand="lg"
				collapseOnSelect
				className="py-3"
			>
				<Container>
					<LinkContainer to="/">
						<Navbar.Brand>Otrade</Navbar.Brand>
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
