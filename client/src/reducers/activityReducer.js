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
	ACTIVITY_DELETE_REQUEST,
	ACTIVITY_DELETE_SUCCESS,
	ACTIVITY_DELETE_FAIL,
	ACTIVITY_LIST_REQUEST,
	ACTIVITY_LIST_SUCCESS,
	ACTIVITY_LIST_FAIL,
} from '../constants/activityConstants';

//add activity reducer
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

//get activity details reducer
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

//update activity reducer
export const activityUpdateReducer = (state = { activity: {} }, action) => {
	switch (action.type) {
		case ACTIVITY_UPDATE_REQUEST:
			return { loading: true };
		case ACTIVITY_UPDATE_SUCCESS:
			return { loading: false, success: true, activity: action.payload };
		case ACTIVITY_UPDATE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

//delete activity reducer
export const activityDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case ACTIVITY_DELETE_REQUEST:
			return { loading: true, ...state };
		case ACTIVITY_DELETE_SUCCESS:
			return { loading: false, success: true };
		case ACTIVITY_DELETE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

//get activity list reducer
export const activityListReducer = (state = { activities: [] }, action) => {
	switch (action.type) {
		case ACTIVITY_LIST_REQUEST:
			return { loading: true, activities: [] };
		case ACTIVITY_LIST_SUCCESS:
			return { loading: false, activities: action.payload };
		case ACTIVITY_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};