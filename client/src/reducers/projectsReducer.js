import {
    GET_PROJECTS,
    PROJECTS_LOADING,
    PROJECTS_ERROR,
    ADD_PROJECT,
    CLEAR_PROJECTS_ERRORS,
    GET_PROJECT_DETAILS,
    GET_CATEGORIES
} from '../actions/types';

const initState = {
    items: [],
    loading: false,
    error: null,
    current: null,
    categories: null
};

export default (state = initState, action) => {
    switch (action.type) {
        case GET_PROJECTS:
            return {
                ...state,
                items: action.payload,
                loading: false
            };
        case GET_PROJECT_DETAILS:
            return {
                ...state,
                current: action.payload,
                loading: false
            };
        case ADD_PROJECT:
            return {
                ...state,
                loading: false
            };
        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
                loading: false
            };
        case PROJECTS_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        case CLEAR_PROJECTS_ERRORS:
            return {
                ...state,
                error: null,
                loading: false
            };
        case PROJECTS_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
};
