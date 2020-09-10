import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

// Set Alert
export const setAlert = (error, type, timeout = 5000) => async (dispatch) => {
    const id = uuid.v4();
    if (!error) return;
    let msg = typeof error == 'string' ? error : error.data;
    let status = typeof error == 'string' ? 500 : error.status;
    dispatch({ type: SET_ALERT, payload: { msg, type, id, status } });
    setTimeout(() => {
        dispatch({ type: REMOVE_ALERT, payload: id });
    }, timeout);
};
