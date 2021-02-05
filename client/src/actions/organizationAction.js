import axios from 'axios';
import {
	ORGANIZATION_ADD_REQUEST,
	ORGANIZATION_ADD_SUCCESS,
	ORGANIZATION_ADD_FAIL,
	ORGANIZATION_DETAILS_REQUEST,
	ORGANIZATION_DETAILS_SUCCESS,
	ORGANIZATION_DETAILS_FAIL,
	ORGANIZATION_UPDATE_REQUEST,
	ORGANIZATION_UPDATE_SUCCESS,
	ORGANIZATION_UPDATE_FAIL,
	ORGANIZATION_DELETE_REQUEST,
	ORGANIZATION_DELETE_SUCCESS,
	ORGANIZATION_DELETE_FAIL,
	ORGANIZATION_LIST_REQUEST,
	ORGANIZATION_LIST_SUCCESS,
	ORGANIZATION_LIST_FAIL,
	ORGANIZATION_STAKEHOLDER_LIST_REQUEST,
	ORGANIZATION_STAKEHOLDER_LIST_SUCCESS,
	ORGANIZATION_STAKEHOLDER_LIST_FAIL,
	ORGANIZATION_PROJECT_FILTER,
	ORGANIZATION_PROJECT_FILTER_CLEAR,
	ORGANIZATION_STAKEHOLDER_FILTER,
	ORGANIZATION_STAKEHOLDER_FILTER_CLEAR,
} from '../constants/organizationConstants';

// add an organization to a project
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

		console.log('projectId', projectId);

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

// get organization details
export const getOrganizationDetails = (orgId) => async (dispatch, getState) => {
	try {
		dispatch({ type: ORGANIZATION_DETAILS_REQUEST });

		//get logged in user
		const {
			userLogin: { userInfo },
		} = getState();

		//create config object
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const {
			data: { data },
		} = await axios.get(`/api/v1/organizations/${orgId}`, config);

		dispatch({ type: ORGANIZATION_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: ORGANIZATION_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

// update organization
export const updateOrganization = (org, orgId) => async (
	dispatch,
	getState
) => {
	try {
		dispatch({ type: ORGANIZATION_UPDATE_REQUEST });

		//get logged in user
		const {
			userLogin: { userInfo },
		} = getState();

		//create config object
		const config = {
			'Content-Type': 'application/json',
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		await axios.put(`/api/v1/organizations/${orgId}`, org, config);

		dispatch({ type: ORGANIZATION_UPDATE_SUCCESS });
	} catch (error) {
		dispatch({
			type: ORGANIZATION_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

// delete organization
export const deleteOrganization = (orgId) => async (dispatch, getState) => {
	try {
		dispatch({ type: ORGANIZATION_DELETE_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		await axios.delete(`/api/v1/organizations/${orgId}`, config);

		dispatch({ type: ORGANIZATION_DELETE_SUCCESS });
	} catch (error) {
		dispatch({
			type: ORGANIZATION_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

// list all organizations for a project
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

// list all organizations for a stakeholder
export const listStakeholderOrganizations = (
	stakeholderId,
	keyword = ''
) => async (dispatch, getState) => {
	try {
		dispatch({ type: ORGANIZATION_STAKEHOLDER_LIST_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		console.log('stakeholderId: ', stakeholderId);

		const {
			data: { data },
		} = await axios.get(
			`/api/v1/stakeholders/${stakeholderId}/organizations?keyword=${keyword}`,
			config
		);
		console.log('data', data);
		dispatch({ type: ORGANIZATION_STAKEHOLDER_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: ORGANIZATION_STAKEHOLDER_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};

// filter project Organizations
export const filterProjectOrganizations = (text) => (dispatch) => {
	console.log(text);
	dispatch({ type: ORGANIZATION_PROJECT_FILTER, payload: text });
};

// clear project Organizations
export const clearProjectOrganizationsFilter = () => (dispatch) => {
	dispatch({ type: ORGANIZATION_PROJECT_FILTER_CLEAR });
};

// filter stakeholder Organizations
export const filterStakeholderOrganizations = (text) => (dispatch) => {
	console.log(text);
	dispatch({ type: ORGANIZATION_STAKEHOLDER_FILTER, payload: text });
};

// clear stakeholder Organizations filter
export const clearStakeholderOrganizationsFilter = () => (dispatch) => {
	dispatch({ type: ORGANIZATION_STAKEHOLDER_FILTER_CLEAR });
};
