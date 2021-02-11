import { SET_ALERT, REMOVE_ALERT } from '../constants/alertConstants';

export const alertReducer = (state = { alerts: [] }, action) => {
	switch (action.type) {
		case SET_ALERT:
			return { ...state, alerts: action.payload };
		case REMOVE_ALERT:
			return state.alerts.filter((alert) => alert.id !== action.payload);
		default:
			return state;
	}
};
