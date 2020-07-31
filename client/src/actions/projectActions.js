import axios from 'axios';
import {
    GET_PROJECTS,
    PROJECTS_LOADING,
    PROJECTS_ERROR,
    CLEAR_PROJECTS_ERRORS,
    GET_PROJECT_DETAILS,
    CREATE_PROJECT,
    GET_CATEGORIES,
    DELETE_PROJECT,
    ADD_PROJECT,
    PAY_PROJECT
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
        dispatch({ type: CREATE_PROJECT, payload: item.data });
        return true;
    } catch (err) {
        console.log('PROJECTS_ERROR');
        dispatch({ type: PROJECTS_ERROR, payload: err.response.data });
    }
};

// delete project
export const deleteProject = (id) => async (dispatch) => {
    dispatch({ type: PROJECTS_LOADING });
    try {
        let deleted = await axios.delete(`/api/projects/${id}/delete`);
        dispatch({ type: DELETE_PROJECT, payload: id });
        return { msg: deleted.data.msg, type: 'success' };
    } catch (err) {
        console.log('PROJECTS_ERROR');
        dispatch({ type: PROJECTS_ERROR, payload: err.response.data });
        return { msg: err.response.data.msg, type: 'danger' };
    }
};

// add project
export const payProject = (id) => async (dispatch) => {
    dispatch({ type: PROJECTS_LOADING });
    try {
        let response = await axios.post(`/api/projects/${id}/pay`);
        dispatch({ type: PAY_PROJECT });
        return { msg: response.data.msg, type: 'success' };
    } catch (err) {
        console.log('PROJECTS_ERROR');
        dispatch({ type: PROJECTS_ERROR, payload: err.response.data });
        return { msg: err.response.data.msg, type: 'danger' };
    }
};

// add project
export const addProject = (id) => async (dispatch) => {
    dispatch({ type: PROJECTS_LOADING });
    try {
        let response = await axios.post(`/api/projects/${id}/add`);
        dispatch({ type: ADD_PROJECT, payload: id });
        return { msg: response.data.msg, type: 'success' };
    } catch (err) {
        console.log('PROJECTS_ERROR');
        dispatch({ type: PROJECTS_ERROR, payload: err.response.data });
        return { msg: err.response.data.msg, type: 'danger' };
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
