import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import Moment from 'react-moment';

const Stakeholder = ({ entity, deleteHandler }) => {
	return (
		<Row>
			<Col md={4}>
				<p>
					<Link to={`/stakeholder/${entity._id}`}>
						{entity.firstName} {entity.lastName}
					</Link>
					<br />
					{entity.email}
					<br />
					{entity.telephone}
				</p>
			</Col>
			<Col md={4}>
				<p>
					Created: <Moment format="MM-DD-YYYY">{entity.createdAt}</Moment>
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

export default Stakeholder;
