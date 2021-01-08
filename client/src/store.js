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
	stakeholderListReducer,
	stakeholderAddReducer,
	stakeholderUpdateReducer,
} from './reducers/stakeholderReducer';
import {
	organizationAddReducer,
	organizationListReducer,
} from './reducers/organizationReducer';

// useSelector calls
const reducer = combineReducers({
	userList: userListReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
	userUpdate: userUpdateReducer,
	userDelete: userDeleteReducer,
	projectList: projectListReducer,
	projectDetails: projectDetailsReducer,
	projectUpdate: projectUpdateReducer,
	projectAdd: projectAddReducer,
	projectUser: projectUserReducer,
	projectUserAssignment: projectUserAssignmentReducer,
	stakeholderList: stakeholderListReducer,
	stakeholderAdd: stakeholderAddReducer,
	stakeholderUpdate: stakeholderUpdateReducer,
	organizationAdd: organizationAddReducer,
	organizationList: organizationListReducer,
});

// localStorages
const userInfoFromStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null;

const usersInfoFromStorage = localStorage.getItem('usersInfo')
	? JSON.parse(localStorage.getItem('usersInfo'))
	: null;

const projectsInfoFromStorage = localStorage.getItem('projectsInfo')
	? JSON.parse(localStorage.getItem('projectsInfo'))
	: null;

const stakeholdersFromStorage = localStorage.getItem('stakeholdersInfo')
	? JSON.parse(localStorage.getItem('stakeholdersInfo'))
	: null;

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
