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

// useSelector calls
const reducer = combineReducers({
	userList: userListReducer,
	userLogin: userLoginReducer,
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
});

// localStorages
const uesrInfoFromStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null;

// initialState
const initialState = {
	userLogin: { userInfo: uesrInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
