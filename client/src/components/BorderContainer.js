import React from 'react';

const BorderContainer = ({ title, children }) => {
	return (
		<div className="border-container">
			<h1>{title}</h1>
			<hr />
			{children}
		</div>
	);
};

export default BorderContainer;
