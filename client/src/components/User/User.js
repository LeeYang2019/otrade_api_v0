import React from 'react';

const User = ({ user }) => {
	return (
		<tr>
			<td>
				{user.firstName} {user.lastName}
			</td>
			<td>{user.email}</td>
		</tr>
	);
};

export default User;
