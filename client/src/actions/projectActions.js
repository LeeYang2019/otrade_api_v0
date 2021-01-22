import axios from 'axios';
import {
	PROJECT_ADD_REQUEST,
	PROJECT_ADD_SUCCESS,
	PROJECT_ADD_FAIL,
	PROJECT_DETAILS_REQUEST,
	PROJECT_DETAILS_SUCCESS,
	PROJECT_DETAILS_FAIL,
	PROJECT_UPDATE_REQUEST,
	PROJECT_UPDATE_SUCCESS,
	PROJECT_UPDATE_FAIL,
	PROJECT_DELETE_REQUEST,
	PROJECT_DELETE_FAIL,
	PROJECT_LIST_REQUEST,
	PROJECT_LIST_SUCCESS,
	PROJECT_LIST_FAIL,
	PROJECT_USER_REQUEST,
	PROJECT_USER_SUCCESS,
	PROJECT_USER_FAIL,
	PROJECT_ASSIGNMENT_REQUEST,
	PROJECT_ASSIGNMENT_SUCCESS,
	PROJECT_ASSIGNMENT_FAIL,
	PROJECT_SAVE_REQUEST,
	PROJECT_USER_FILTER,
	PROJECT_USER_FILTER_CLEAR,
} from '../constants/projectConstants';

//add project
export const addProject = (project) => async (dispatch, getState) => {
	try {
		dispatch({ type: PROJECT_ADD_REQUEST });

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
		} = await axios.post(`/api/v1/projects/`, project, config);

		dispatch({ type: PROJECT_ADD_SUCCESS, payload: data });
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;

		dispatch({
			type: PROJECT_ADD_FAIL,
			payload: message,
		});
	}
};

//get the details of a project
export const listProjectDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: PROJECT_DETAILS_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get(`/api/v1/projects/${id}`, config);

		dispatch({ type: PROJECT_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: PROJECT_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};

//update project
export const updateProject = (project) => async (dispatch, getState) => {
	try {
		dispatch({ type: PROJECT_UPDATE_REQUEST });

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
		const { data } = await axios.put(
			`/api/v1/projects/${project._id}`,
			project,
			config
		);

		dispatch({ type: PROJECT_UPDATE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: PROJECT_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

//delete a project
export const deleteProject = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: PROJECT_DELETE_REQUEST });

		//get logged-in user
		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		await axios.delete(`/api/v1/projects/${id}`, config);

		dispatch({ type: PROJECT_DELETE_REQUEST });
	} catch (error) {
		dispatch({
			type: PROJECT_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};

//get all projects
export const listProjects = (keyword = '', pageNumber = '') => async (
	dispatch,
	getState
) => {
	try {
		dispatch({ type: PROJECT_LIST_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get(
			`/api/v1/projects?keyword=${keyword}&pageNumber=${pageNumber}`,
			config
		);

		dispatch({ type: PROJECT_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: PROJECT_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};

//list all projects for a user
export const listUserProjects = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: PROJECT_USER_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get(`/api/v1/projects/user/${id}`, config);

		dispatch({ type: PROJECT_USER_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: PROJECT_USER_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};

//assign user to project
export const assignProjectUser = (projectId, assignments) => async (
	dispatch,
	getState
) => {
	try {
		dispatch({ type: PROJECT_ASSIGNMENT_REQUEST });

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
		} = await axios.put(
			`/api/v1/projects/${projectId}/assign`,
			assignments,
			config
		);

		console.log(data);

		dispatch({ type: PROJECT_ASSIGNMENT_SUCCESS, payload: data });
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;

		dispatch({
			type: PROJECT_ASSIGNMENT_FAIL,
			payload: message,
		});
	}
};

export const saveProjectInfo = (data) => (dispatch) => {
	dispatch({
		type: PROJECT_SAVE_REQUEST,
		payload: data,
	});
	localStorage.setItem('projectInfo', JSON.stringify(data));
};

//filter user projects
export const filterProjects = (text) => (dispatch) => {
	console.log(text);
	dispatch({ type: PROJECT_USER_FILTER, payload: text });
};

//clear user projects filter
export const clearProjectsFilter = () => (dispatch) => {
	dispatch({ type: PROJECT_USER_FILTER_CLEAR });
};
