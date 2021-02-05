import axios from 'axios';
import {
	STAKEHOLDER_ADD_REQUEST,
	STAKEHOLDER_ADD_SUCCESS,
	STAKEHOLDER_ADD_FAIL,
	STAKEHOLDER_DETAILS_REQUEST,
	STAKEHOLDER_DETAILS_SUCCESS,
	STAKEHOLDER_DETAILS_FAIL,
	STAKEHOLDER_UPDATE_REQUEST,
	STAKEHOLDER_UPDATE_SUCCESS,
	STAKEHOLDER_UPDATE_FAIL,
	STAKEHOLDER_DELETE_REQUEST,
	STAKEHOLDER_DELETE_SUCCESS,
	STAKEHOLDER_DELETE_FAIL,
	STAKEHOLDER_LIST_REQUEST,
	STAKEHOLDER_LIST_SUCCESS,
	STAKEHOLDER_LIST_FAIL,
	STAKEHOLDER_SAVE_REQUEST,
	STAKEHOLDER_PROJECT_FILTER,
	STAKEHOLDER_PROJECT_FILTER_CLEAR,
	STAKEHOLDER_SAVE_RESET,
} from '../constants/stakeholderConstants';

// add stakeholder
export const addStakeholder = (stakeholder, projectId) => async (
	dispatch,
	getState
) => {
	try {
		dispatch({ type: STAKEHOLDER_ADD_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		//pass id, project, and config file to api
		const {
			data: { data },
		} = await axios.post(
			`/api/v1/projects/${projectId}/stakeholders`,
			stakeholder,
			config
		);

		dispatch({ type: STAKEHOLDER_ADD_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: STAKEHOLDER_ADD_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

// get stakeholder details
export const getStakeholderDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: STAKEHOLDER_DETAILS_REQUEST });

		//get logged in user
		const {
			userLogin: { userInfo },
		} = getState();

		//create config
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const {
			data: { data },
		} = await axios.get(`/api/v1/stakeholders/${id}`, config);

		dispatch({ type: STAKEHOLDER_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: STAKEHOLDER_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

// update stakeholder
export const updateStakeholder = (stakeholder, id) => async (
	dispatch,
	getState
) => {
	try {
		dispatch({ type: STAKEHOLDER_UPDATE_REQUEST });

		//get logged in user
		const {
			userLogin: { userInfo },
		} = getState();

		//create config obj
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const {
			data: { data },
		} = await axios.put(`/api/v1/stakeholders/${id}`, stakeholder, config);

		dispatch({ type: STAKEHOLDER_UPDATE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: STAKEHOLDER_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

// delete stakeholder
export const deleteStakeholder = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: STAKEHOLDER_DELETE_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		await axios.delete(`/api/v1/stakeholders/${id}`, config);

		dispatch({ type: STAKEHOLDER_DELETE_SUCCESS });
	} catch (error) {
		dispatch({
			type: STAKEHOLDER_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

// list all stakeholders
export const listStakeholders = (projectId, keyword = '') => async (
	dispatch,
	getState
) => {
	try {
		dispatch({ type: STAKEHOLDER_LIST_REQUEST });

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
			`/api/v1/projects/${projectId}/stakeholders?keyword=${keyword}`,
			config
		);

		dispatch({ type: STAKEHOLDER_LIST_SUCCESS, payload: data });

		localStorage.setItem('stakeholdersInfo', JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: STAKEHOLDER_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};

// save stakeholder info to localstorage
export const saveStakeholderInfo = (data) => (dispatch) => {
	dispatch({
		type: STAKEHOLDER_SAVE_REQUEST,
		payload: data,
	});
	localStorage.setItem('stakeholdersInfo', JSON.stringify(data));
};

// remove stakeholder info from localstorage
export const removeStakeholderInfo = () => (dispatch) => {
	dispatch({ type: STAKEHOLDER_SAVE_RESET });
	localStorage.removeItem('stakeholdersInfo');
};

// filter user projects
export const filterProjectStakeholders = (text) => (dispatch) => {
	dispatch({ type: STAKEHOLDER_PROJECT_FILTER, payload: text });
};

// clear user projects filter
export const clearProjectStakeholdersFilter = () => (dispatch) => {
	dispatch({ type: STAKEHOLDER_PROJECT_FILTER_CLEAR });
};
