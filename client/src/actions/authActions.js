import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    AUTH_LOADING,
    LOGOUT,
    CLEAR_ERRORS
} from './types';

// Load User
export const loadUser = () => async (dispatch) => {
    dispatch({ type: AUTH_LOADING });
    if (localStorage.token) {
        setAuthToken(localStorage.token);
        try {
            const res = await axios.get('/api/auth');
            dispatch({ type: USER_LOADED, payload: res.data });
        } catch (err) {
            dispatch({ type: AUTH_ERROR });
        }
    } else {
        dispatch({ type: AUTH_ERROR });
    }
};

// Register User
export const register = (formData) => async (dispatch) => {
    dispatch({ type: AUTH_LOADING });
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const res = await axios.post('/api/users', formData, config);
        dispatch({ type: REGISTER_SUCCESS, payload: res.data });
        // dispatch(loadUser());
    } catch (err) {
        console.log('Error', err);
        dispatch({ type: REGISTER_FAIL, payload: err.response.data });
    }
};

// Login User
export const login = (formData) => async (dispatch) => {
    dispatch({ type: AUTH_LOADING });
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const res = await axios.post('/api/auth', formData, config);
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
        dispatch(loadUser());
    } catch (err) {
        console.log('Error', err.response.data);
        dispatch({ type: LOGIN_FAIL, payload: err.response.data });
    }
};

// Logout
export const logout = () => (dispatch) => {
    dispatch({ type: AUTH_LOADING });
    dispatch({ type: LOGOUT });
};

// Clear Errors
export const clearErrors = () => (dispatch) => {
    dispatch({ type: AUTH_LOADING });
    dispatch({ type: CLEAR_ERRORS });
};
