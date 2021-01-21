import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Tabs, Tab, Row, Col } from 'react-bootstrap';
import ProjectEditScreen from './ProjectEditScreen';
import Assigment from '../../components/Assignment';
import BorderContainer from '../../components/BorderContainer';

const ProjectUpdateScreen = ({ match, history }) => {
	return (
		<>
			<Link to="/admin/projects" className="btn btn-primary my-3">
				Back to Project List
			</Link>
			<BorderContainer title={''}>
				<Col md={12} className="m-auto">
					<Tabs defaultActiveKey="editProject" id="tabs" variant="tabs">
						<Tab eventKey="editProject" title="Edit Project">
							<ProjectEditScreen match={match} history={history} />
						</Tab>
						<Tab eventKey="assignments" title="Project Assignments">
							<Route
								render={({ history }) => (
									<Assigment history={history} match={match} />
								)}
							/>
						</Tab>
					</Tabs>
				</Col>
			</BorderContainer>
		</>
	);
};

export default ProjectUpdateScreen;
