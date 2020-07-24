import { GET_PROJECTS, PROJECTS_LOADING, PROJECTS_ERROR, CLEAR_PROJECTS_ERRORS } from '../actions/types';

const initState = {
    items: [],
    loading: false,
    error: null
};

export default (state = initState, action) => {
    switch (action.type) {
        case GET_PROJECTS:
            return {
                ...state,
                items: action.payload,
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
