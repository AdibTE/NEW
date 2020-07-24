import axios from 'axios';
import { GET_PROJECTS, PROJECTS_LOADING, PROJECTS_ERROR, CLEAR_PROJECTS_ERRORS } from './types';

// get all projects
export const getProjects = () => async (dispatch) => {
    dispatch({ type: PROJECTS_LOADING });

    try {
        let items = await axios.get('/api/projects');
        dispatch({ type: GET_PROJECTS, payload: items.data });
    } catch (err) {
        console.log('PROJECTS_ERROR');
        dispatch({ type: PROJECTS_ERROR, payload: err });
    }
};

// remove errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: PROJECTS_LOADING });
    dispatch({ type: CLEAR_PROJECTS_ERRORS });
};
