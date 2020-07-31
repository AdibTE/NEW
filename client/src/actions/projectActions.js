import axios from 'axios';
import {
    GET_PROJECTS,
    PROJECTS_LOADING,
    PROJECTS_ERROR,
    CLEAR_PROJECTS_ERRORS,
    GET_PROJECT_DETAILS,
    ADD_PROJECT,
    GET_CATEGORIES
} from './types';

// get all projects
export const getProjects = () => async (dispatch) => {
    dispatch({ type: PROJECTS_LOADING });

    try {
        let items = await axios.get('/api/projects');
        dispatch({ type: GET_PROJECTS, payload: items.data });
    } catch (err) {
        console.log('PROJECTS_ERROR');
        dispatch({ type: PROJECTS_ERROR, payload: err.response.data });
    }
};

// get all user projects
export const getUserProjects = () => async (dispatch) => {
    dispatch({ type: PROJECTS_LOADING });

    try {
        let items = await axios.get('/api/projects/me');
        dispatch({ type: GET_PROJECTS, payload: items.data });
    } catch (err) {
        console.log('PROJECTS_ERROR');
        dispatch({ type: PROJECTS_ERROR, payload: err.response.data });
    }
};

// get single project details
export const getProjectDetails = (id) => async (dispatch) => {
    dispatch({ type: PROJECTS_LOADING });

    try {
        let item = await axios.get('/api/projects/' + id);
        dispatch({ type: GET_PROJECT_DETAILS, payload: item.data });
    } catch (err) {
        console.log('PROJECTS_ERROR');
        dispatch({ type: PROJECTS_ERROR, payload: err.response.data });
    }
};

// create new project
export const createProject = (formData) => async (dispatch) => {
    dispatch({ type: PROJECTS_LOADING });
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        let item = await axios.post('/api/projects/create', formData, config);
        console.log('done');
        dispatch({ type: ADD_PROJECT, payload: item.data });
    } catch (err) {
        console.log('PROJECTS_ERROR');
        dispatch({ type: PROJECTS_ERROR, payload: err.response.data });
    }
};

// get all categories
export const getCategories = () => async (dispatch) => {
    dispatch({ type: PROJECTS_LOADING });

    try {
        let items = await axios.get('/api/settings/categories');
        dispatch({ type: GET_CATEGORIES, payload: items.data });
    } catch (err) {
        console.log('PROJECTS_ERROR');
        dispatch({ type: PROJECTS_ERROR, payload: err.response.data });
    }
};

// remove errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: PROJECTS_LOADING });
    dispatch({ type: CLEAR_PROJECTS_ERRORS });
};
