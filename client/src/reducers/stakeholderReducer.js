import {
	STAKEHOLDER_ADD_REQUEST,
	STAKEHOLDER_ADD_SUCCESS,
	STAKEHOLDER_ADD_FAIL,
	STAKEHOLDER_ADD_RESET,
	STAKEHOLDER_DETAILS_REQUEST,
	STAKEHOLDER_DETAILS_SUCCESS,
	STAKEHOLDER_DETAILS_FAIL,
	STAKEHOLDER_UPDATE_REQUEST,
	STAKEHOLDER_UPDATE_SUCCESS,
	STAKEHOLDER_UPDATE_FAIL,
	STAKEHOLDER_UPDATE_RESET,
	STAKEHOLDER_DELETE_REQUEST,
	STAKEHOLDER_DELETE_SUCCESS,
	STAKEHOLDER_DELETE_FAIL,
	STAKEHOLDER_LIST_REQUEST,
	STAKEHOLDER_LIST_SUCCESS,
	STAKEHOLDER_LIST_FAIL,
	STAKEHOLDER_SAVE_REQUEST,
	STAKEHOLDER_SAVE_RESET,
	STAKEHOLDER_PROJECT_FILTER,
	STAKEHOLDER_PROJECT_FILTER_CLEAR,
	STAKEHOLDER_ASSIGN_REQUEST,
	STAKEHOLDER_ASSIGN_RESET,
} from '../constants/stakeholderConstants';

// add stakeholder
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

// get stakeholder details
export const stakeholderDetailsReducer = (
	state = { stakeholder: {} },
	action
) => {
	switch (action.type) {
		case STAKEHOLDER_DETAILS_REQUEST:
			return { loading: true, ...state };
		case STAKEHOLDER_DETAILS_SUCCESS:
			return { loading: false, success: true, stakeholder: action.payload };
		case STAKEHOLDER_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

// update stakeholder details
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

// delete stakeholder
export const stakeholderDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case STAKEHOLDER_DELETE_REQUEST:
			return { loading: true, ...state };
		case STAKEHOLDER_DELETE_SUCCESS:
			return { loading: false, success: true };
		case STAKEHOLDER_DELETE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

// stakeholder list
export const stakeholderListReducer = (
	state = { stakeholders: [], filtered: [] },
	action
) => {
	switch (action.type) {
		case STAKEHOLDER_LIST_REQUEST:
			return { loading: true, stakeholders: [] };
		case STAKEHOLDER_LIST_SUCCESS:
			return { loading: false, stakeholders: action.payload };
		case STAKEHOLDER_PROJECT_FILTER:
			return {
				...state,
				filtered: state.stakeholders.filter((contact) => {
					const regex = new RegExp(`${action.payload}`, 'gi');
					return (
						contact.firstName.match(regex) || contact.lastName.match(regex)
					);
				}),
			};
		case STAKEHOLDER_PROJECT_FILTER_CLEAR:
			return {
				...state,
				filtered: null,
			};
		case STAKEHOLDER_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const stakeholderAssignReducer = (state = { members: [] }, action) => {
	switch (action.type) {
		case STAKEHOLDER_ASSIGN_REQUEST:
			return { ...state, members: action.payload };
		case STAKEHOLDER_ASSIGN_RESET:
			return { members: [] };
		default:
			return state;
	}
};

// save stakeholder to localStorage
export const stakeholderSaveReducer = (
	state = { stakeholderInfo: {} },
	action
) => {
	switch (action.type) {
		case STAKEHOLDER_SAVE_REQUEST:
			return { ...state, stakeholderInfo: action.payload };
		case STAKEHOLDER_SAVE_RESET:
			return { stakeholderInfo: {} };
		default:
			return state;
	}
};
