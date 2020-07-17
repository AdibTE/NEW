import { combineReducers } from 'redux';
import alertReducer from './alertReducer';
import authReducer from './authReducer';
import loadingReducer from './loadingReducer';
export default combineReducers({
    auth: authReducer,
    alerts: alertReducer,
    loading: loadingReducer
});
