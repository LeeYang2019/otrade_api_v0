import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

const Project = ({ project, userId = '' }) => {
	return (
		<>
			<Row>
				<Col md={9}>
					<p>
						<strong>Project: </strong>
						<Link to={`/project/${project._id}`}>{project.projectName}</Link>
						<br />
						Client: <em>{project.projectClient}</em>
						<br />
						Created Date: <strong>{project.createdAt.substring(0, 10)}</strong>
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
			<Row>
				<Col>
					<p>
						<em>Assigned To:</em>{' '}
						{project.assignees.length === 0 ? (
							<strong>No Assignment</strong>
						) : (
							<em>
								{project.assignees
									.map((a) => `${a.firstName} ${a.lastName}`)
									.join(', ')}
							</em>
						)}
					</p>
				</Col>
			</Row>
		</>
	);
};

export default Project;
