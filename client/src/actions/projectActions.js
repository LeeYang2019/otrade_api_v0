import axios from 'axios';
import {
	PROJECT_LIST_REQUEST,
	PROJECT_LIST_SUCCESS,
	PROJECT_LIST_FAIL,
	PROJECT_DETAILS_REQUEST,
	PROJECT_DETAILS_SUCCESS,
	PROJECT_DETAILS_FAIL,
	PROJECT_UPDATE_REQUEST,
	PROJECT_UPDATE_SUCCESS,
	PROJECT_UPDATE_FAIL,
} from '../constants/projectConstants';

export const listProjects = () => async (dispatch, getState) => {
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

		const { data } = await axios.get('/api/v1/projects', config);
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

//get the details of a project
export const listProjectDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: PROJECT_DETAILS_REQUEST });
		const { data } = await axios.get(`/api/v1/projects/${id}`);

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
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;

		dispatch({
			type: PROJECT_UPDATE_FAIL,
			payload: message,
		});
	}
};
