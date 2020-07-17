import {
    PAGE_LOADED,
    PAGE_LOADING
} from '../actions/types';

const initialState = true;

export default (state = initialState, action) => {
    switch (action.type) {
        case PAGE_LOADED:
            return false
        case PAGE_LOADING:
            return true
        default:
            return state;
    }
};
