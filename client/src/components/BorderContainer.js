import React from 'react';

const BorderContainer = ({ title, children }) => {
	return (
		<div className="border-container">
			<div className="title">{title}</div>
			{children}
		</div>
	);
};

export default BorderContainer;
