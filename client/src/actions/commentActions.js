import axios from 'axios';
import {
	COMMENT_ADD_REQUEST,
	COMMENT_ADD_SUCCESS,
	COMMENT_ADD_FAIL,
	COMMENT_DETAILS_REQUEST,
	COMMENT_DETAILS_SUCCESS,
	COMMENT_DETAILS_FAIL,
	COMMENT_UPDATE_REQUEST,
	COMMENT_UPDATE_SUCCESS,
	COMMENT_UPDATE_FAIL,
	COMMENT_DELETE_REQUEST,
	COMMENT_DELETE_SUCCESS,
	COMMENT_DELETE_FAIL,
	COMMENT_LIST_REQUEST,
	COMMENT_LIST_SUCCESS,
	COMMENT_LIST_FAIL,
} from '../constants/commentConstants';

// add comment
export const addComment = (comment, stakeholderId) => async (
	dispatch,
	getState
) => {
	try {
		dispatch({ type: COMMENT_ADD_REQUEST });

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
		} = await axios.post(
			`/api/v1/stakeholders/${stakeholderId}/comments`,
			comment,
			config
		);

		dispatch({ type: COMMENT_ADD_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: COMMENT_ADD_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};

// get a comment
export const getComment = (commentId) => async (dispatch, getState) => {
	try {
		dispatch({ type: COMMENT_DETAILS_REQUEST });

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
		} = await axios.get(`/api/v1/comments/${commentId}`, config);

		dispatch({ type: COMMENT_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: COMMENT_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};

// update a comment
export const updateComment = (comment, commentId) => async (
	dispatch,
	getState
) => {
	try {
		dispatch({ type: COMMENT_UPDATE_REQUEST });

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
		} = await axios.put(`/api/v1/comments/${commentId}`, comment, config);

		dispatch({ type: COMMENT_UPDATE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: COMMENT_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};

// delete a comment
export const deleteComment = (commentId) => async (dispatch, getState) => {
	try {
		dispatch({ type: COMMENT_DELETE_REQUEST });

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
		} = await axios.delete(`/api/v1/comments/${commentId}`, config);

		dispatch({ type: COMMENT_DELETE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: COMMENT_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};

// get a list of comments
export const listComments = (stakeholderId) => async (dispatch, getState) => {
	try {
		dispatch({ type: COMMENT_LIST_REQUEST });

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
		} = await axios.get(
			`/api/v1/stakeholders/${stakeholderId}/comments`,
			config
		);

		dispatch({ type: COMMENT_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: COMMENT_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};
