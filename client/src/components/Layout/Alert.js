import React from 'react';
import { useSelector } from 'react-redux';

const Alert = () => {
	const alertReducer = useSelector((state) => state.alertReducer);
	const { alerts } = alertReducer;

	return (
		<>
			{alerts &&
				alerts.length > 0 &&
				alerts.map((alert) => (
					<div key={alert.id} className={`alert alert-${alert.alertType}`}>
						{alert.msg}
					</div>
				))}
		</>
	);
};

export default Alert;
