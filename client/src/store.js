import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// import reducers
import {
	projectListReducer,
	projectDetailsReducer,
	projectUpdateReducer,
	projectAddReducer,
	projectDeleteReducer,
	projectUserReducer,
	projectUserAssignmentReducer,
	projectSaveReducer,
} from './reducers/projectReducers';
import {
	userListReducer,
	userLoginReducer,
	userRegisterReducer,
	userDetailsReducer,
	userUpdateProfileReducer,
	userUpdateReducer,
	userDeleteReducer,
} from './reducers/userReducer';
import {
	stakeholderAddReducer,
	stakeholderDetailsReducer,
	stakeholderUpdateReducer,
	stakeholderDeleteReducer,
	stakeholderListReducer,
	stakeholderSaveReducer,
} from './reducers/stakeholderReducer';
import {
	organizationAddReducer,
	organizationDetailsReducer,
	organizationUpdateReducer,
	organizationDeleteReducer,
	organizationListReducer,
	organizationStakeholderListReducer,
} from './reducers/organizationReducer';
import {
	activityAddReducer,
	activityDetailsReducer,
	activityUpdateReducer,
	activityDeleteReducer,
	activityListReducer,
	activitySaveReducer,
	activityStakeholderListReducer,
} from './reducers/activityReducer';
import {
	commentAddReducer,
	commentDetailsReducer,
	commentUpdateReducer,
	commentDeleteReducer,
	commentListReducer,
} from './reducers/commentReducer';
import {
	commitmentAddReducer,
	commitmentDetailsReducer,
	commitmentUpdateReducer,
	commitmentDeleteReducer,
	commitmentListReducer,
} from './reducers/commitmentReducer';
import {
	communityAddReducer,
	communityDetailsReducer,
	communityUpdateReducer,
	communityDeleteReducer,
	communityListReducer,
} from './reducers/communityReducer';
import {
	landownershipAddReducer,
	landownershipDetailsReducer,
	landownershipUpdateReducer,
	landownershipDeleteReducer,
	landownershipListReducer,
} from './reducers/landownershipReducer';

// useSelector calls
const reducer = combineReducers({
	// user reducers
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
	userUpdate: userUpdateReducer,
	userDelete: userDeleteReducer,
	userList: userListReducer,

	// project reducers
	projectAdd: projectAddReducer,
	projectDetails: projectDetailsReducer,
	projectUpdate: projectUpdateReducer,
	projectDelete: projectDeleteReducer,
	projectList: projectListReducer,
	projectUser: projectUserReducer,
	projectUserAssignment: projectUserAssignmentReducer,
	projectSave: projectSaveReducer,

	// stakeholder reducers
	stakeholderAdd: stakeholderAddReducer,
	stakeholderDetails: stakeholderDetailsReducer,
	stakeholderUpdate: stakeholderUpdateReducer,
	stakeholderDelete: stakeholderDeleteReducer,
	stakeholderList: stakeholderListReducer,
	stakeholderSave: stakeholderSaveReducer,

	// organization reducers
	organizationAdd: organizationAddReducer,
	organizationDetails: organizationDetailsReducer,
	organizationUpdate: organizationUpdateReducer,
	organizationDelete: organizationDeleteReducer,
	organizationList: organizationListReducer,
	organizationStakeholderList: organizationStakeholderListReducer,

	// activity reducers
	activityAdd: activityAddReducer,
	activityDetails: activityDetailsReducer,
	activityUpdate: activityUpdateReducer,
	activityDelete: activityDeleteReducer,
	activityList: activityListReducer,
	activitySave: activitySaveReducer,
	activityStakeholderList: activityStakeholderListReducer,

	// comment reducers
	commentAdd: commentAddReducer,
	commentDetails: commentDetailsReducer,
	commentUpdate: commentUpdateReducer,
	commentDelete: commentDeleteReducer,
	commentList: commentListReducer,

	// commitment reducers
	commitmentAdd: commitmentAddReducer,
	commitmentDetails: commitmentDetailsReducer,
	commitmentUpdate: commitmentUpdateReducer,
	commitmentDelete: commitmentDeleteReducer,
	commitmentList: commitmentListReducer,

	// community reducers
	communityAdd: communityAddReducer,
	communityDetails: communityDetailsReducer,
	communityUpdate: communityUpdateReducer,
	communityDelete: communityDeleteReducer,
	communityList: communityListReducer,

	// landownership reducers
	landownershipAdd: landownershipAddReducer,
	landownershipDetails: landownershipDetailsReducer,
	landownershipUpdate: landownershipUpdateReducer,
	landownershipDelete: landownershipDeleteReducer,
	landownershipList: landownershipListReducer,
});

// localStorages
const userInfoFromStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null;

const projectInfoFromStorage = localStorage.getItem('projectInfo')
	? JSON.parse(localStorage.getItem('projectInfo'))
	: null;

const stakeholderInfoFromStorage = localStorage.getItem('stakeholdersInfo')
	? JSON.parse(localStorage.getItem('stakeholdersInfo'))
	: null;

const activityInfoFromStorage = localStorage.getItem('activityInfo')
	? JSON.parse(localStorage.getItem('activityInfo'))
	: null;

// initialState
const initialState = {
	userLogin: { userInfo: userInfoFromStorage },
	stakeholder: { stakeholderInfo: stakeholderInfoFromStorage },
	project: { projectInfo: projectInfoFromStorage },
	activity: { activityInfo: activityInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
