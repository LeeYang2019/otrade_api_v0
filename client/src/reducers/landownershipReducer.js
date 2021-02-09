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

// add landownership
export const landownershipAddReducer = (state = {}, action) => {
	switch (action.type) {
		case LANDOWNERSHIP_ADD_REQUEST:
			return { loading: true };
		case LANDOWNERSHIP_ADD_SUCCESS:
			return { loading: false };
		case LANDOWNERSHIP_ADD_FAIL:
			return { loading: false };
		default:
			return state;
	}
};

// get landownership details
export const landownershipDetailsReducer = (state = {}, action) => {
	switch (action.type) {
		case LANDOWNERSHIP_DETAILS_REQUEST:
			return { loading: true };
		case LANDOWNERSHIP_DETAILS_SUCCESS:
			return { loading: false };
		case LANDOWNERSHIP_DETAILS_FAIL:
			return { loading: false };
		default:
			return state;
	}
};

// update landownership
export const landownershipUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case LANDOWNERSHIP_UPDATE_REQUEST:
			return { loading: true };
		case LANDOWNERSHIP_UPDATE_SUCCESS:
			return { loading: false };
		case LANDOWNERSHIP_UPDATE_FAIL:
			return { loading: false };
		default:
			return state;
	}
};

// delete landownership
export const landownershipDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case LANDOWNERSHIP_DELETE_REQUEST:
			return { loading: true };
		case LANDOWNERSHIP_DELETE_SUCCESS:
			return { loading: false };
		case LANDOWNERSHIP_DELETE_FAIL:
			return { loading: false };
		default:
			return state;
	}
};

// get list of landownership
export const landownershipListReducer = (state = {}, action) => {
	switch (action.type) {
		case LANDOWNERSHIP_LIST_REQUEST:
			return { loading: true };
		case LANDOWNERSHIP_LIST_SUCCESS:
			return { loading: false };
		case LANDOWNERSHIP_LIST_FAIL:
			return { loading: false };
		default:
			return state;
	}
};
