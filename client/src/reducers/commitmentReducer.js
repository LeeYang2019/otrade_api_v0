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
export const commitmentAddReducer = (state = {}, action) => {
	switch (action.type) {
		case COMMITMENT_ADD_REQUEST:
			return { loading: true };
		case COMMITMENT_ADD_SUCCESS:
			return { loading: false };
		case COMMITMENT_ADD_FAIL:
			return { loading: false };
		default:
			return state;
	}
};

// get commitment details
export const commitmentDetailsReducer = (
	state = { commitment: {} },
	action
) => {
	switch (action.type) {
		case COMMITMENT_DETAILS_REQUEST:
			return { loading: true };
		case COMMITMENT_DETAILS_SUCCESS:
			return { loading: false };
		case COMMITMENT_DETAILS_FAIL:
			return { loading: false };
		default:
			return state;
	}
};

// update commitment
export const commitmentUpdateReducer = (state = { commitment: {} }, action) => {
	switch (action.type) {
		case COMMITMENT_UPDATE_REQUEST:
			return { loading: true };
		case COMMITMENT_UPDATE_SUCCESS:
			return { loading: false };
		case COMMITMENT_UPDATE_FAIL:
			return { loading: false };
		default:
			return state;
	}
};

// delete commitment
export const commitmentDeleteReducer = (state = { commitment: {} }, action) => {
	switch (action.type) {
		case COMMITMENT_DELETE_REQUEST:
			return { loading: true };
		case COMMITMENT_DELETE_SUCCESS:
			return { loading: false };
		case COMMITMENT_DELETE_FAIL:
			return { loading: false };
		default:
			return state;
	}
};

// list commitment
export const commitmentListReducer = (state = { commitments: [] }, action) => {
	switch (action.type) {
		case COMMITMENT_LIST_REQUEST:
			return { loading: true };
		case COMMITMENT_LIST_SUCCESS:
			return { loading: false };
		case COMMITMENT_LIST_FAIL:
			return { loading: false };
		default:
			return state;
	}
};
