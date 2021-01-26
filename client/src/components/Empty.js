import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Empty = ({ itemLink, type, url }) => {
	return (
		<Row>
			<Col md={12} className="d-flex justify-content-end">
				<Link to={`${url}${itemLink}`} className="btn btn-primary">
					<i className="fas fa-plus"></i> {type}
				</Link>
			</Col>
		</Row>
	);
};

export default Empty;
