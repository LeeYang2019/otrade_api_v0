import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// import reducers
import { projectListReducer } from './reducers/projectReducers';
import { userListReducer } from './reducers/userReducer';

// useSelector calls
const reducer = combineReducers({
	projectList: projectListReducer,
	userList: userListReducer,
});

// localStorages

// initialState
const initialState = {};

const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
