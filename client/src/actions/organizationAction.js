import axios from 'axios';
import {
	ORGANIZATION_ADD_REQUEST,
	ORGANIZATION_ADD_SUCCESS,
	ORGANIZATION_ADD_FAIL,
	ORGANIZATION_LIST_REQUEST,
	ORGANIZATION_LIST_SUCCESS,
	ORGANIZATION_LIST_FAIL,
} from '../constants/organizationConstants';

export const addOrganization = (organization, projectId) => async (
	dispatch,
	getState
) => {
	console.log(organization);
	try {
		dispatch({ type: ORGANIZATION_ADD_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const {
			data: { data },
		} = await axios.post(
			`/api/v1/projects/${projectId}/organizations`,
			organization,
			config
		);

		console.log(data);

		dispatch({ type: ORGANIZATION_ADD_SUCCESS, payload: data });
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		dispatch({ type: ORGANIZATION_ADD_FAIL, payload: message });
	}
};

export const listOrganizations = () => async (dispatch, getState) => {
	try {
		dispatch({ type: ORGANIZATION_LIST_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get(``, config);

		dispatch({ type: ORGANIZATION_LIST_SUCCESS, payload: data });
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		dispatch({ type: ORGANIZATION_LIST_FAIL, payload: message });
	}
};
