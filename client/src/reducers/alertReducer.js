import { SET_ALERT, REMOVE_ALERT } from '../constants/alertConstants';

export const alertReducer = (state = {}, action) => {
	switch (action.type) {
		case SET_ALERT:
			return [...state];
		case REMOVE_ALERT:
			return state.filter((alert) => alert.id !== action.payload);
		default:
			return state;
	}
};
