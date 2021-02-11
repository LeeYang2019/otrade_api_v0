import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import Moment from 'react-moment';

const Activity = ({ url, entity, deleteHandler }) => {
	return (
		<Row>
			<Col>
				<p className="mr-3">
					<strong>Activity: </strong>
					<Link to={`${url}/${entity._id}/profile`}>{entity.activity}</Link>
					<br />
					Created:{' '}
					<strong>
						<Moment format="MM-DD-YYYY">{entity.createdAt}</Moment>
					</strong>
					<br />
					Status:{' '}
					<em>
						{entity.isComplete === 'true' ? (
							<strong className="text-success">Complete</strong>
						) : (
							<strong className="text-warning">In Progress</strong>
						)}
					</em>
				</p>
			</Col>
			<Col md={4} className="d-flex align-items-center justify-content-end">
				<Button
					variant="danger"
					className="btn-md ml-3"
					onClick={() => deleteHandler(entity._id)}
				>
					<i className="fas fa-trash"></i> Delete
				</Button>
			</Col>
		</Row>
	);
};

export default Activity;
