import {
	COMMUNITY_ADD_REQUEST,
	COMMUNITY_ADD_SUCCESS,
	COMMUNITY_ADD_FAIL,
	COMMUNITY_DETAILS_REQUEST,
	COMMUNITY_DETAILS_SUCCESS,
	COMMUNITY_DETAILS_FAIL,
	COMMUNITY_UPDATE_REQUEST,
	COMMUNITY_UPDATE_SUCCESS,
	COMMUNITY_UPDATE_FAIL,
	COMMUNITY_DELETE_REQUEST,
	COMMUNITY_DELETE_SUCCESS,
	COMMUNITY_DELETE_FAIL,
	COMMUNITY_LIST_REQUEST,
	COMMUNITY_LIST_SUCCESS,
	COMMUNITY_LIST_FAIL,
} from '../constants/communityConstants';

// add community
export const communityAddReducer = (state = {}, action) => {
	switch (action.type) {
		case COMMUNITY_ADD_REQUEST:
			return { loading: true };
		case COMMUNITY_ADD_SUCCESS:
			return { loading: false };
		case COMMUNITY_ADD_FAIL:
			return { loading: false };
		default:
			return state;
	}
};

// get community details
export const communityDetailsReducer = (state = {}, action) => {
	switch (action.type) {
		case COMMUNITY_DETAILS_REQUEST:
			return { loading: true };
		case COMMUNITY_DETAILS_SUCCESS:
			return { loading: false };
		case COMMUNITY_DETAILS_FAIL:
			return { loading: false };
		default:
			return state;
	}
};

// update community
export const communityUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case COMMUNITY_UPDATE_REQUEST:
			return { loading: true };
		case COMMUNITY_UPDATE_SUCCESS:
			return { loading: false };
		case COMMUNITY_UPDATE_FAIL:
			return { loading: false };
		default:
			return state;
	}
};

// delete community
export const communityDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case COMMUNITY_DELETE_REQUEST:
			return { loading: true };
		case COMMUNITY_DELETE_SUCCESS:
			return { loading: false };
		case COMMUNITY_DELETE_FAIL:
			return { loading: false };
		default:
			return state;
	}
};

// get list of communities
export const communityListReducer = (state = {}, action) => {
	switch (action.type) {
		case COMMUNITY_LIST_REQUEST:
			return { loading: true };
		case COMMUNITY_LIST_SUCCESS:
			return { loading: false };
		case COMMUNITY_LIST_FAIL:
			return { loading: false };
		default:
			return state;
	}
};
