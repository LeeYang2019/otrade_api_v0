import axios from 'axios';
import {
	PROJECT_LIST_REQUEST,
	PROJECT_LIST_SUCCESS,
	PROJECT_LIST_FAIL,
} from '../constants/projectConstants';

export const listProjects = () => async (dispatch) => {
	try {
		dispatch({ type: PROJECT_LIST_REQUEST });
		const {
			data: { data },
		} = await axios.get('/api/v1/projects');
		dispatch({ type: PROJECT_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: PROJECT_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.messsage,
		});
	}
};
