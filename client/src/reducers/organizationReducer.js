import {
	ORGANIZATION_ADD_REQUEST,
	ORGANIZATION_ADD_SUCCESS,
	ORGANIZATION_ADD_FAIL,
	ORGANIZATION_ADD_RESET,
	ORGANIZATION_DETAILS_REQUEST,
	ORGANIZATION_DETAILS_SUCCESS,
	ORGANIZATION_DETAILS_FAIL,
	ORGANIZATION_UPDATE_REQUEST,
	ORGANIZATION_UPDATE_SUCCESS,
	ORGANIZATION_UPDATE_FAIL,
	ORGANIZATION_UPDATE_RESET,
	ORGANIZATION_DELETE_REQUEST,
	ORGANIZATION_DELETE_SUCCESS,
	ORGANIZATION_DELETE_FAIL,
	ORGANIZATION_LIST_REQUEST,
	ORGANIZATION_LIST_SUCCESS,
	ORGANIZATION_LIST_FAIL,
	ORGANIZATION_STAKEHOLDER_LIST_REQUEST,
	ORGANIZATION_STAKEHOLDER_LIST_SUCCESS,
	ORGANIZATION_STAKEHOLDER_LIST_FAIL,
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
export const organizationDetailsReducer = (
	state = { organization: {} },
	action
) => {
	switch (action.type) {
		case ORGANIZATION_DETAILS_REQUEST:
			return { loading: true, ...state };
		case ORGANIZATION_DETAILS_SUCCESS:
			return { loading: false, organization: action.payload };
		case ORGANIZATION_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

//update organization reducer
export const organizationUpdateReducer = (
	state = { organization: {} },
	action
) => {
	switch (action.type) {
		case ORGANIZATION_UPDATE_REQUEST:
			return { loading: true };
		case ORGANIZATION_UPDATE_SUCCESS:
			return { loading: false, success: true, organization: action.payload };
		case ORGANIZATION_UPDATE_FAIL:
			return { loading: false, error: action.payload };
		case ORGANIZATION_UPDATE_RESET:
			return { organization: {} };
		default:
			return state;
	}
};

//delete organization reducer
export const organizationDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case ORGANIZATION_DELETE_REQUEST:
			return { loading: true, ...state };
		case ORGANIZATION_DELETE_SUCCESS:
			return { loading: false, success: true };
		case ORGANIZATION_DELETE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

//get organization list reducer
export const organizationListReducer = (
	state = { organizations: [] },
	action
) => {
	switch (action.type) {
		case ORGANIZATION_LIST_REQUEST:
			return { loading: true, organizations: [] };
		case ORGANIZATION_LIST_SUCCESS:
			return {
				loading: false,
				organizations: action.payload,
			};
		case ORGANIZATION_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

//get organization list reducer
export const organizationStakeholderListReducer = (
	state = { organizations: [] },
	action
) => {
	switch (action.type) {
		case ORGANIZATION_STAKEHOLDER_LIST_REQUEST:
			return { loading: true, organizations: [] };
		case ORGANIZATION_STAKEHOLDER_LIST_SUCCESS:
			return {
				loading: false,
				organizations: action.payload,
			};
		case ORGANIZATION_STAKEHOLDER_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
