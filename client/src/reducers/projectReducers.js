// import constants
import {
	PROJECT_LIST_REQUEST,
	PROJECT_LIST_SUCCESS,
	PROJECT_LIST_FAIL,
	PROJECT_DETAILS_REQUEST,
	PROJECT_DETAILS_SUCCESS,
	PROJECT_DETAILS_FAIL,
	PROJECT_UPDATE_REQUEST,
	PROJECT_UPDATE_SUCCESS,
	PROJECT_UPDATE_FAIL,
	PROJECT_UPDATE_RESET,
	PROJECT_USER_REQUEST,
	PROJECT_USER_SUCCESS,
	PROJECT_USER_FAIL,
	PROJECT_USER_RESET,
} from '../constants/projectConstants';

//project list
export const projectListReducer = (state = { projects: [] }, action) => {
	switch (action.type) {
		case PROJECT_LIST_REQUEST:
			return { loading: true, projects: [] };
		case PROJECT_LIST_SUCCESS:
			return { loading: false, projects: action.payload };
		case PROJECT_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

//project list
export const projectDetailsReducer = (state = { project: {} }, action) => {
	switch (action.type) {
		case PROJECT_DETAILS_REQUEST:
			return { loading: true, ...state };
		case PROJECT_DETAILS_SUCCESS:
			return { loading: false, project: action.payload };
		case PROJECT_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

//projectUpdate
export const projectUpdateReducer = (state = { project: {} }, action) => {
	switch (action.type) {
		case PROJECT_UPDATE_REQUEST:
			return { loading: true };
		case PROJECT_UPDATE_SUCCESS:
			return { loading: false, success: true, project: action.payload };
		case PROJECT_UPDATE_FAIL:
			return { loading: false, error: action.payload };
		case PROJECT_UPDATE_RESET:
			return { project: {} };
		default:
			return state;
	}
};

//user projects
export const projectUserReducer = (state = { projects: [] }, action) => {
	switch (action.type) {
		case PROJECT_USER_REQUEST:
			return { loading: true, projects: [] };
		case PROJECT_USER_SUCCESS:
			return { loading: false, projects: action.payload };
		case PROJECT_USER_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
