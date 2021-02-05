import {
	COMMENT_ADD_REQUEST,
	COMMENT_ADD_SUCCESS,
	COMMENT_ADD_FAIL,
	COMMENT_ADD_RESET,
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

// add comment reducer
export const commentAddReducer = (state = {}, action) => {
	switch (action.type) {
		case COMMENT_ADD_REQUEST:
			return { loading: true };
		case COMMENT_ADD_SUCCESS:
			return { loading: false, success: true, comment: action.payload };
		case COMMENT_ADD_FAIL:
			return { loading: false };
		case COMMENT_ADD_RESET:
			return { state: {} };
		default:
			return state;
	}
};

// get comment details reducer
export const commentDetailsReducer = (state = { comment: {} }, action) => {
	switch (action.type) {
		case COMMENT_DETAILS_REQUEST:
			return { loading: true, ...state };
		case COMMENT_DETAILS_SUCCESS:
			return { loading: false, comment: action.payload };
		case COMMENT_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

// update comment reducer
export const commentUpdateReducer = (state = { comment: {} }, action) => {
	switch (action.type) {
		case COMMENT_UPDATE_REQUEST:
			return { loading: true };
		case COMMENT_UPDATE_SUCCESS:
			return { loading: false, success: true, comment: action.payload };
		case COMMENT_UPDATE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

// delete comment reducer
export const commentDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case COMMENT_DELETE_REQUEST:
			return { loading: true, ...state };
		case COMMENT_DELETE_SUCCESS:
			return { loading: false, success: true };
		case COMMENT_DELETE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

// list comment reducer
export const commentListReducer = (state = { comments: [] }, action) => {
	switch (action.type) {
		case COMMENT_LIST_REQUEST:
			return { loading: true, comments: [] };
		case COMMENT_LIST_SUCCESS:
			return { loading: false, comments: action.payload };
		case COMMENT_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
