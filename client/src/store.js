import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// import reducers
import {
	projectListReducer,
	projectDetailsReducer,
	projectUpdateReducer,
	projectAddReducer,
	projectUserReducer,
	projectUserAssignmentReducer,
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
} from './reducers/stakeholderReducer';
import {
	organizationAddReducer,
	organizationDetailsReducer,
	organizationUpdateReducer,
	organizationDeleteReducer,
	organizationListReducer,
} from './reducers/organizationReducer';
import {
	activityAddReducer,
	activityDetailsReducer,
	activityUpdateReducer,
	activityDeleteReducer,
	activityListReducer,
} from './reducers/activityReducer';
import {
	commentAddReducer,
	commentDetailsReducer,
	commentUpdateReducer,
	commentDeleteReducer,
	commentListReducer,
} from './reducers/commentReducer';

// useSelector calls
const reducer = combineReducers({
	//user reducers
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
	userUpdate: userUpdateReducer,
	userDelete: userDeleteReducer,
	userList: userListReducer,

	//project reducers
	projectAdd: projectAddReducer,
	projectDetails: projectDetailsReducer,
	projectUpdate: projectUpdateReducer,
	projectList: projectListReducer,
	projectUser: projectUserReducer,
	projectUserAssignment: projectUserAssignmentReducer,

	//stakeholder reducers
	stakeholderAdd: stakeholderAddReducer,
	stakeholderDetails: stakeholderDetailsReducer,
	stakeholderUpdate: stakeholderUpdateReducer,
	stakeholderDelete: stakeholderDeleteReducer,
	stakeholderList: stakeholderListReducer,

	//organization reducers
	organizationAdd: organizationAddReducer,
	organizationDetails: organizationDetailsReducer,
	organizationUpdate: organizationUpdateReducer,
	organizationDelete: organizationDeleteReducer,
	organizationList: organizationListReducer,

	//activity reducers
	activityAdd: activityAddReducer,
	activityDetails: activityDetailsReducer,
	activityUpdate: activityUpdateReducer,
	activityDelete: activityDeleteReducer,
	activityList: activityListReducer,

	//comment reducers
	commentAdd: commentAddReducer,
	commentDetails: commentDetailsReducer,
	commentUpdate: commentUpdateReducer,
	commentDelete: commentDeleteReducer,
	commentList: commentListReducer,
});

// localStorages
const userInfoFromStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null;

// const usersInfoFromStorage = localStorage.getItem('usersInfo')
// 	? JSON.parse(localStorage.getItem('usersInfo'))
// 	: null;

// const projectsInfoFromStorage = localStorage.getItem('projectsInfo')
// 	? JSON.parse(localStorage.getItem('projectsInfo'))
// 	: null;

// const stakeholdersFromStorage = localStorage.getItem('stakeholdersInfo')
// 	? JSON.parse(localStorage.getItem('stakeholdersInfo'))
// 	: null;

// initialState
const initialState = {
	userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
