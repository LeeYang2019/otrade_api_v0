import React from 'react';

const Project = ({ project }) => {
	return (
		<tr>
			<td>{project.projectName}</td>
			<td>{project.projectClient}</td>
		</tr>
	);
};

export default Project;
