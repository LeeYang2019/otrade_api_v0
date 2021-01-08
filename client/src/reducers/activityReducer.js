import {
	ACTIVITY_ADD_REQUEST,
	ACTIVITY_ADD_SUCCESS,
	ACTIVITY_ADD_FAIL,
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
		default:
			return state;
	}
};

//get activity details reducer
export const activityDetailsReducer = () => {};

//update activity reducer
export const activityUpdateReducer = () => {};

//delete activity reducer
export const activityDeleteReducer = () => {};

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
