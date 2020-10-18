import {
    GET_PROJECTS,
    PROJECTS_LOADING,
    PROJECTS_ERROR,
    CREATE_PROJECT,
    CLEAR_PROJECTS_ERRORS,
    GET_PROJECT_DETAILS,
    GET_CATEGORIES,
    GET_AllSTARS,
    DELETE_PROJECT,
    ADD_PROJECT,
    PAY_PROJECT,
    CREATE_CATEGORY
} from '../actions/types';

const initState = {
    items: [],
    loading: false,
    error: null,
    current: null,
    categories: null,
    allStars: null,
    projectCreated: false
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
        case CREATE_PROJECT:
            return {
                ...state,
                projectCreated: true,
                loading: false
            };
        case DELETE_PROJECT:
            return {
                ...state,
                items: state.items.filter((project) => project.ID !== action.payload),
                loading: false
            };
        case ADD_PROJECT:
        case PAY_PROJECT:
        case CREATE_CATEGORY:
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
        case GET_AllSTARS:
            return {
                ...state,
                allStars: action.payload,
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
