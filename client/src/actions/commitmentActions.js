import axios from 'axios';
import {
	COMMITMENT_ADD_REQUEST,
	COMMITMENT_ADD_SUCCESS,
	COMMITMENT_ADD_FAIL,
	COMMITMENT_DETAILS_REQUEST,
	COMMITMENT_DETAILS_SUCCESS,
	COMMITMENT_DETAILS_FAIL,
	COMMITMENT_UPDATE_REQUEST,
	COMMITMENT_UPDATE_SUCCESS,
	COMMITMENT_UPDATE_FAIL,
	COMMITMENT_DELETE_REQUEST,
	COMMITMENT_DELETE_SUCCESS,
	COMMITMENT_DELETE_FAIL,
	COMMITMENT_LIST_REQUEST,
	COMMITMENT_LIST_SUCCESS,
	COMMITMENT_LIST_FAIL,
} from '../constants/commitmentConstants';

// add commitment
export const addCommitment = () => async (dispatch, getState) => {
	try {
		dispatch({ type: COMMITMENT_ADD_REQUEST });

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

		dispatch({ type: COMMITMENT_ADD_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: COMMITMENT_ADD_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};

// get commitment details
export const getCommitment = () => async (dispatch, getState) => {
	try {
		dispatch({ type: COMMITMENT_DETAILS_REQUEST });

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

		dispatch({ type: COMMITMENT_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: COMMITMENT_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};

// update commitment
export const updateCommitment = () => async (dispatch, getState) => {
	try {
		dispatch({ type: COMMITMENT_UPDATE_REQUEST });

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

		dispatch({ type: COMMITMENT_UPDATE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: COMMITMENT_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};

// delete commitment
export const deleteCommitment = () => async (dispatch, getState) => {
	try {
		dispatch({ type: COMMITMENT_DELETE_REQUEST });

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

		dispatch({ type: COMMITMENT_DELETE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: COMMITMENT_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};

// get list of commitments
export const listCommitments = () => async (dispatch, getState) => {
	try {
		dispatch({ type: COMMITMENT_LIST_REQUEST });

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

		dispatch({ type: COMMITMENT_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: COMMITMENT_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};
