import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';

const ProfileTop = ({ profile, btnlinks, navbarlinks, url }) => {
	return (
		<div className="profile-container mb-3">
			<Row>
				<Col md={3}>
					<div className="image-container">
						<img src={profile.image} alt="profile" className="profile" />
					</div>
				</Col>
				<Col md={9}>
					<Row>
						<Col>
							<h1>
								<strong>
									{profile.firstName ? (
										<>
											{profile.firstName} {profile.lastName}
										</>
									) : (
										<>{profile.projectName}</>
									)}
								</strong>
							</h1>
						</Col>
					</Row>
					<Row className="middle-row">
						<Col md={6}>
							{profile.projectClient && (
								<strong>
									<em>
										{profile.projectClient}
										<br />
									</em>
								</strong>
							)}
							{profile.email ? (
								<>
									<strong>{profile.email}</strong>
									<br />
								</>
							) : null}
							{profile.status === 'active' || profile.status === 'open' ? (
								<>
									<strong>
										status: <em className="text-success">{profile.status}</em>
									</strong>
								</>
							) : (
								<>
									<strong>
										status: <em className="text-danger">{profile.status}</em>
									</strong>
								</>
							)}
							{profile.location && <strong>{profile.location}</strong>}
						</Col>
						<Col className="d-flex justify-content-end align-items-start">
							{btnlinks.map((item) => (
								<Link to={`${url}${item.link}`} className={item.class}>
									<i className={item.icon}></i>
									{item.type}
								</Link>
							))}
						</Col>
					</Row>
					<hr />
					<Row className="lower-row">
						<Col>
							<ul className="my-navbar">
								{navbarlinks.map((item) => (
									<li>
										<NavLink
											activeClassName="selected"
											activeStyle={{
												fontWeight: 'bold',
												color: 'blue',
												textDecoration: 'underline',
											}}
											to={`${url}${item.link}`}
										>
											{item.type}
										</NavLink>
									</li>
								))}
							</ul>
						</Col>
					</Row>
				</Col>
			</Row>
		</div>
	);
};

export default ProfileTop;
