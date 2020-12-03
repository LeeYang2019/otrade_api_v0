import axios from 'axios';
import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGOUT,
	USER_LIST_REQUEST,
	USER_LIST_SUCCESS,
	USER_LIST_FAIL,
} from '../constants/userConstants';

export const login = (email, password) => async (dispatch) => {
	console.log('inside action');
	try {
		dispatch({
			type: USER_LOGIN_REQUEST,
		});

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.post(
			'/api/v1/users/login',
			{ email, password },
			config
		);

		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		});

		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: USER_LOGIN_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};

export const listUsers = () => async (dispatch) => {
	try {
		dispatch({ type: USER_LIST_REQUEST });

		const {
			data: { data },
		} = await axios.get('/api/v1/users');

		dispatch({ type: USER_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: USER_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};
