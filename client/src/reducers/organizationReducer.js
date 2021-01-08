import {
	ORGANIZATION_ADD_REQUEST,
	ORGANIZATION_ADD_SUCCESS,
	ORGANIZATION_ADD_FAIL,
	ORGANIZATION_ADD_RESET,
	ORGANIZATION_LIST_REQUEST,
	ORGANIZATION_LIST_SUCCESS,
	ORGANIZATION_LIST_FAIL,
} from '../constants/organizationConstants';

//add organization reducer
export const organizationAddReducer = (state = {}, action) => {
	switch (action.type) {
		case ORGANIZATION_ADD_REQUEST:
			return { loading: true };
		case ORGANIZATION_ADD_SUCCESS:
			return { loading: false, success: true, organization: action.payload };
		case ORGANIZATION_ADD_FAIL:
			return { loading: false, error: action.payload };
		case ORGANIZATION_ADD_RESET:
			return { organization: {} };
		default:
			return state;
	}
};

//get organization details reducer
export const organizationDetailsReducer = () => {};

//update organization reducer
export const organizationUpdateReducer = () => {};

//delete organization reducer
export const organizationDeleteReducer = () => {};

//get organization list reducer
export const organizationListReducer = (
	state = { organizations: [] },
	action
) => {
	switch (action.type) {
		case ORGANIZATION_LIST_REQUEST:
			console.log('request');
			return { loading: true, organizations: [] };
		case ORGANIZATION_LIST_SUCCESS:
			console.log('success');
			return {
				loading: false,
				organizations: action.payload,
			};
		case ORGANIZATION_LIST_FAIL:
			console.log('fail');
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
