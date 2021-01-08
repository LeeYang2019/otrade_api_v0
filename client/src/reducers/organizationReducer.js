import {
	ORGANIZATION_ADD_REQUEST,
	ORGANIZATION_ADD_SUCCESS,
	ORGANIZATION_ADD_FAIL,
	ORGANIZATION_LIST_REQUEST,
	ORGANIZATION_LIST_SUCCESS,
	ORGANIZATION_LIST_FAIL,
} from '../constants/organizationConstants';

export const organizationAddReducer = (state = {}, action) => {
	switch (action.type) {
		case ORGANIZATION_ADD_REQUEST:
			return { loading: true };
		case ORGANIZATION_ADD_SUCCESS:
			return { loading: false, success: true, organization: action.payload };
		case ORGANIZATION_ADD_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const organizationListReducer = (
	state = { organizations: [] },
	action
) => {
	switch (action.type) {
		case ORGANIZATION_LIST_REQUEST:
			return { loading: true };
		case ORGANIZATION_LIST_SUCCESS:
			return {
				loading: false,
				success: true,
				organizations: action.payload.organizations,
			};
		case ORGANIZATION_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
