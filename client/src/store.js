import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// import reducers
import { projectListReducer } from './reducers/projectReducers';
import {
	userListReducer,
	userLoginReducer,
	userDetailsReducer,
	userUpdateProfileReducer,
} from './reducers/userReducer';

// useSelector calls
const reducer = combineReducers({
	projectList: projectListReducer,
	userList: userListReducer,
	userLogin: userLoginReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
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
