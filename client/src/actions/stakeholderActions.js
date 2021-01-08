import axios from 'axios';
import {
	STAKEHOLDER_LIST_REQUEST,
	STAKEHOLDER_LIST_SUCCESS,
	STAKEHOLDER_LIST_FAIL,
	STAKEHOLDER_ADD_REQUEST,
	STAKEHOLDER_ADD_SUCCESS,
	STAKEHOLDER_ADD_FAIL,
} from '../constants/stakeholderConstants';

export const listStakeholders = (projectId, keyword = '') => async (
	dispatch,
	getState
) => {
	console.log('entered listStakeholders');
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

		console.log(keyword);

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

//add stakeholder
export const addStakeholder = (stakeholder, projectId) => async (
	dispatch,
	getState
) => {
	console.log('inside addStakeholder action');
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
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;

		dispatch({
			type: STAKEHOLDER_ADD_FAIL,
			payload: message,
		});
	}
};
