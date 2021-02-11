import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

const Project = ({ project, userId = '' }) => {
	return (
		<Row>
			<Col md={9}>
				<p>
					<Link to={`/project/${project._id}`}>{project.projectName}</Link>
					<br />
					Created:{' '}
					<strong>
						<Moment format="MM-DD-YYYY">{project.createdAt}</Moment>
					</strong>
				</p>
			</Col>
			<Col className="text-left" md={3}>
				<p>
					<strong>Status: </strong>
					{project.status === 'open' ? (
						<strong>
							<em className="text-success">{project.status}</em>
						</strong>
					) : (
						<strong>
							<em className="text-danger">{project.status}</em>
						</strong>
					)}
				</p>
			</Col>
		</Row>
	);
};

export default Project;
