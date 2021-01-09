import axios from 'axios';
import {
	ACTIVITY_ADD_REQUEST,
	ACTIVITY_ADD_SUCCESS,
	ACTIVITY_ADD_FAIL,
	ACTIVITY_LIST_REQUEST,
	ACTIVITY_LIST_SUCCESS,
	ACTIVITY_LIST_FAIL,
} from '../constants/activityConstants';

//add activity
export const addActivity = (activity, projectId) => async (
	dispatch,
	getState
) => {
	try {
		dispatch({ type: ACTIVITY_ADD_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		console.log('user: ', userInfo);
		console.log('act: ', activity);

		const {
			data: { data },
		} = await axios.post(
			`/api/v1/projects/${projectId}/activities`,
			activity,
			config
		);

		dispatch({ type: ACTIVITY_ADD_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: ACTIVITY_ADD_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};

//get activity details
export const getActivityDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({});

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

		dispatch({});
	} catch (error) {
		dispatch({});
	}
};

//update activity
export const updateActivity = (id) => async (dispatch, getState) => {
	try {
		dispatch({});

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

		dispatch({});
	} catch (error) {
		dispatch({});
	}
};

//delete activity
export const deleteActivity = (id) => async (dispatch, getState) => {
	try {
		dispatch({});

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

		dispatch({});
	} catch (error) {
		dispatch({});
	}
};

//get all activities
export const listActivities = (projectId) => async (dispatch, getState) => {
	try {
		dispatch({ type: ACTIVITY_LIST_REQUEST });

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
		} = await axios.get(`/api/v1/projects/${projectId}/activities`, config);

		dispatch({ type: ACTIVITY_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: ACTIVITY_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};
