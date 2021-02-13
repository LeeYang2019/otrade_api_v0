import {
	ACTIVITY_ADD_REQUEST,
	ACTIVITY_ADD_SUCCESS,
	ACTIVITY_ADD_FAIL,
	ACTIVITY_ADD_RESET,
	ACTIVITY_DETAILS_REQUEST,
	ACTIVITY_DETAILS_SUCCESS,
	ACTIVITY_DETAILS_FAIL,
	ACTIVITY_UPDATE_REQUEST,
	ACTIVITY_UPDATE_SUCCESS,
	ACTIVITY_UPDATE_FAIL,
	ACTIVITY_UPDATE_RESET,
	ACTIVITY_DELETE_REQUEST,
	ACTIVITY_DELETE_SUCCESS,
	ACTIVITY_DELETE_FAIL,
	ACTIVITY_DELETE_RESET,
	ACTIVITY_LIST_REQUEST,
	ACTIVITY_LIST_SUCCESS,
	ACTIVITY_LIST_FAIL,
	ACTIVITY_LIST_FILTER,
	ACTIVITY_LIST_FILTER_CLEAR,
	ACTIVITY_SAVE_REQUEST,
	ACTIVITY_SAVE_RESET,
	ACTIVITY_STAKEHOLDER_LIST_REQUEST,
	ACTIVITY_STAKEHOLDER_LIST_SUCCESS,
	ACTIVITY_STAKEHOLDER_LIST_FAIL,
	ACTIVITY_STAKEHOLDER_FILTER,
	ACTIVITY_STAKEHOLDER_FILTER_CLEAR,
} from '../constants/activityConstants';

// add activity reducer
export const activityAddReducer = (state = {}, action) => {
	switch (action.type) {
		case ACTIVITY_ADD_REQUEST:
			return { loading: true };
		case ACTIVITY_ADD_SUCCESS:
			return { loading: false, success: true, activity: action.payload };
		case ACTIVITY_ADD_FAIL:
			return { loading: false, error: action.payload };
		case ACTIVITY_ADD_RESET:
			return { state: {} };
		default:
			return state;
	}
};

// get activity details reducer
export const activityDetailsReducer = (state = { activity: {} }, action) => {
	switch (action.type) {
		case ACTIVITY_DETAILS_REQUEST:
			return { loading: true, ...state };
		case ACTIVITY_DETAILS_SUCCESS:
			return { loading: false, activity: action.payload };
		case ACTIVITY_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

// update activity reducer
export const activityUpdateReducer = (state = { activity: {} }, action) => {
	switch (action.type) {
		case ACTIVITY_UPDATE_REQUEST:
			return { loading: true };
		case ACTIVITY_UPDATE_SUCCESS:
			return { loading: false, success: true, activity: action.payload };
		case ACTIVITY_UPDATE_FAIL:
			return { loading: false, error: action.payload };
		case ACTIVITY_UPDATE_RESET:
			return { activity: {} };
		default:
			return state;
	}
};

// delete activity reducer
export const activityDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case ACTIVITY_DELETE_REQUEST:
			return { loading: true, ...state };
		case ACTIVITY_DELETE_SUCCESS:
			return { loading: false, success: true };
		case ACTIVITY_DELETE_FAIL:
			return { loading: false, error: action.payload };
		case ACTIVITY_DELETE_RESET:
			return {};
		default:
			return state;
	}
};

// get activity list reducer
export const activityListReducer = (
	state = { activities: [], filtered: [] },
	action
) => {
	switch (action.type) {
		case ACTIVITY_LIST_REQUEST:
			return { loading: true, activities: [] };
		case ACTIVITY_LIST_SUCCESS:
			return { loading: false, activities: action.payload };
		case ACTIVITY_LIST_FAIL:
			return { loading: false, error: action.payload };
		case ACTIVITY_LIST_FILTER:
			return {
				...state,
				filtered: state.activities.filter((contact) => {
					const regex = new RegExp(`${action.payload}`, 'gi');
					return contact.activity.match(regex);
				}),
			};
		case ACTIVITY_LIST_FILTER_CLEAR:
			return {
				...state,
				filtered: null,
			};
		default:
			return state;
	}
};

// get stakeholder activities
export const activityStakeholderListReducer = (
	state = { stakeholderactivities: [], filtered: [] },
	action
) => {
	switch (action.type) {
		case ACTIVITY_STAKEHOLDER_LIST_REQUEST:
			return { loading: true, stakeholderactivities: [] };
		case ACTIVITY_STAKEHOLDER_LIST_SUCCESS:
			return {
				loading: false,
				stakeholderactivities: action.payload,
			};
		case ACTIVITY_STAKEHOLDER_LIST_FAIL:
			return { loading: false, error: action.payload };
		case ACTIVITY_STAKEHOLDER_FILTER:
			return {
				...state,
				filtered: state.stakeholderactivities.filter((contact) => {
					const regex = new RegExp(`${action.payload}`, 'gi');
					return contact.activity.match(regex);
				}),
			};
		case ACTIVITY_STAKEHOLDER_FILTER_CLEAR:
			return {
				...state,
				filtered: null,
			};
		default:
			return state;
	}
};

// save activity to localstorage
export const activitySaveReducer = (state = { activityInfo: {} }, action) => {
	switch (action.type) {
		case ACTIVITY_SAVE_REQUEST:
			return { ...state, activityInfo: action.payload };
		case ACTIVITY_SAVE_RESET:
			return { activityInfo: {} };
		default:
			return state;
	}
};
