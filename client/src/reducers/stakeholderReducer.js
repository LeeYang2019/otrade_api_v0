import {
	STAKEHOLDER_LIST_REQUEST,
	STAKEHOLDER_LIST_SUCCESS,
	STAKEHOLDER_LIST_FAIL,
	STAKEHOLDER_ADD_REQUEST,
	STAKEHOLDER_ADD_SUCCESS,
	STAKEHOLDER_ADD_FAIL,
	STAKEHOLDER_ADD_RESET,
	STAKEHOLDER_UPDATE_REQUEST,
	STAKEHOLDER_UPDATE_SUCCESS,
	STAKEHOLDER_UPDATE_FAIL,
	STAKEHOLDER_UPDATE_RESET,
	STAKEHOLDER_DELETE_REQUEST,
	STAKEHOLDER_DELETE_SUCCESS,
	STAKEHOLDER_DELETE_FAIL,
} from '../constants/stakeholderConstants';

//stakeholder list
export const stakeholderListReducer = (
	state = { stakeholders: [] },
	action
) => {
	switch (action.type) {
		case STAKEHOLDER_LIST_REQUEST:
			return { loading: true, stakeholders: [] };
		case STAKEHOLDER_LIST_SUCCESS:
			return { loading: false, stakeholders: action.payload };
		case STAKEHOLDER_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const stakeholderAddReducer = (state = {}, action) => {
	switch (action.type) {
		case STAKEHOLDER_ADD_REQUEST:
			return { loading: true };
		case STAKEHOLDER_ADD_SUCCESS:
			return { loading: false, success: true, stakeholder: action.payload };
		case STAKEHOLDER_ADD_FAIL:
			return { loading: false, error: action.payload };
		case STAKEHOLDER_ADD_RESET:
			return { stakeholder: {} };
		default:
			return state;
	}
};

export const stakeholderUpdateReducer = (
	state = { stakeholder: {} },
	action
) => {
	switch (action.type) {
		case STAKEHOLDER_UPDATE_REQUEST:
			return { loading: true };
		case STAKEHOLDER_UPDATE_SUCCESS:
			return { loading: false, success: true, stakeholder: action.payload };
		case STAKEHOLDER_UPDATE_FAIL:
			return { loading: false, error: action.payload };
		case STAKEHOLDER_UPDATE_RESET:
			return { stakeholder: {} };
		default:
			return state;
	}
};
