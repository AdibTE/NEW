import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

export default (state = [], action) => {
    switch (action.type) {
        case SET_ALERT:
            return [ action.payload, ...state ];
        case REMOVE_ALERT:
            return state.filter(toast => toast.id !== action.payload);
        default:
            return state;
    }
};
