import axios from 'axios';
import {
	LANDOWNERSHIP_ADD_REQUEST,
	LANDOWNERSHIP_ADD_SUCCESS,
	LANDOWNERSHIP_ADD_FAIL,
	LANDOWNERSHIP_DETAILS_REQUEST,
	LANDOWNERSHIP_DETAILS_SUCCESS,
	LANDOWNERSHIP_DETAILS_FAIL,
	LANDOWNERSHIP_UPDATE_REQUEST,
	LANDOWNERSHIP_UPDATE_SUCCESS,
	LANDOWNERSHIP_UPDATE_FAIL,
	LANDOWNERSHIP_DELETE_REQUEST,
	LANDOWNERSHIP_DELETE_SUCCESS,
	LANDOWNERSHIP_DELETE_FAIL,
	LANDOWNERSHIP_LIST_REQUEST,
	LANDOWNERSHIP_LIST_SUCCESS,
	LANDOWNERSHIP_LIST_FAIL,
} from '../constants/landownershipConstants';

// add Landownership
export const addLandownership = () => async (dispatch, getState) => {
	try {
		dispatch({ type: LANDOWNERSHIP_ADD_REQUEST });

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

		const {
			data: { data },
		} = await axios.post(``, config);

		dispatch({ type: LANDOWNERSHIP_ADD_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: LANDOWNERSHIP_ADD_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};

// get Landownership details
export const getLandownership = () => async (dispatch, getState) => {
	try {
		dispatch({ type: LANDOWNERSHIP_DETAILS_REQUEST });

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
		} = await axios.get(``, config);

		dispatch({ type: LANDOWNERSHIP_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: LANDOWNERSHIP_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};

// update Landownership
export const updateLandownership = () => async (dispatch, getState) => {
	try {
		dispatch({ type: LANDOWNERSHIP_UPDATE_REQUEST });

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

		const {
			data: { data },
		} = await axios.put(``, config);

		dispatch({ type: LANDOWNERSHIP_UPDATE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: LANDOWNERSHIP_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};

// delete Landownership
export const deleteLandownership = () => async (dispatch, getState) => {
	try {
		dispatch({ type: LANDOWNERSHIP_DELETE_REQUEST });

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
		} = await axios.delete(``, config);

		dispatch({ type: LANDOWNERSHIP_DELETE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: LANDOWNERSHIP_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};

// get list of landownerships
export const listLandownerships = () => async (dispatch, getState) => {
	try {
		dispatch({ type: LANDOWNERSHIP_LIST_REQUEST });

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
		} = await axios.get(``, config);

		dispatch({ type: LANDOWNERSHIP_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: LANDOWNERSHIP_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};
