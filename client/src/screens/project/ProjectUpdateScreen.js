import React from 'react';
import { Link } from 'react-router-dom';
import { Tabs, Tab, Row, Col } from 'react-bootstrap';
import ProjectEditScreen from './ProjectEditScreen';
import Assigment from '../../components/Assignment';

const ProjectUpdateScreen = ({ match, history }) => {
	return (
		<>
			<Link to="/admin/projects" className="btn btn-primary my-3">
				Back to Project List
			</Link>
			<Row>
				<Col md={8} className="m-auto">
					<Tabs defaultActiveKey="editProject" id="tabs" variant="tabs">
						<Tab eventKey="editProject" title="Edit Project">
							<ProjectEditScreen match={match} history={history} />
						</Tab>
						<Tab eventKey="assignments" title="Project Assignments">
							<Assigment match={match} />
						</Tab>
					</Tabs>
				</Col>
			</Row>
		</>
	);
};

export default ProjectUpdateScreen;
