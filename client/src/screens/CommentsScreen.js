import React from 'react';
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormContainer from '../components/FormContainer';

const CommentsScreen = () => {
	return (
		<FormContainer>
			<div>
				<Row>
					<Link to="/admin/projects" className="btn btn-primary my-3">
						Test Primary
					</Link>
				</Row>
				<Row>
					<Link to="/admin/projects" className="btn btn-secondary my-3">
						Test Secondary
					</Link>
				</Row>
				<Row>
					<Link to="/admin/projects" className="btn btn-success my-3">
						Test Success
					</Link>
				</Row>
				<Row>
					<Link to="/admin/projects" className="btn btn-danger my-3">
						Test Danger
					</Link>
				</Row>
				<Row>
					<Link to="/admin/projects" className="btn btn-warning my-3">
						Test Warning
					</Link>
				</Row>
				<Row>
					<Link to="/admin/projects" className="btn btn-info my-3">
						Test Info
					</Link>
				</Row>
				<Row>
					<Link to="/admin/projects" className="btn btn-light my-3">
						Test Light
					</Link>
				</Row>
				<Row>
					<Link to="/admin/projects" className="btn btn-dark my-3">
						Test Dark
					</Link>
				</Row>
			</div>
		</FormContainer>
	);
};

export default CommentsScreen;
