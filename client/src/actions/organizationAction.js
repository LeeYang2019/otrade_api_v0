import axios from 'axios';
import {
	ORGANIZATION_ADD_REQUEST,
	ORGANIZATION_ADD_SUCCESS,
	ORGANIZATION_ADD_FAIL,
	ORGANIZATION_LIST_REQUEST,
	ORGANIZATION_LIST_SUCCESS,
	ORGANIZATION_LIST_FAIL,
} from '../constants/organizationConstants';

//add organization
export const addOrganization = (organization, projectId) => async (
	dispatch,
	getState
) => {
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

		dispatch({ type: ORGANIZATION_ADD_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: ORGANIZATION_ADD_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

//get organization details
export const getOrganizationDetails = (orgId) => async (dispatch, getState) => {
	try {
	} catch (error) {}
};

//update organization
export const updateOrganization = (orgId) => async (dispatch, getState) => {
	try {
	} catch (error) {}
};

//delete organization
export const deleteOrganization = (orgId) => async (dispatch, getState) => {
	try {
	} catch (error) {}
};

//list all organizations
export const listOrganizations = (projectId, keyword = '') => async (
	dispatch,
	getState
) => {
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

		const {
			data: { data },
		} = await axios.get(
			`/api/v1/projects/${projectId}/organizations?keyword=${keyword}`,
			config
		);

		dispatch({ type: ORGANIZATION_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: ORGANIZATION_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};
