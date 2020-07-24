import { combineReducers } from 'redux';
import alertReducer from './alertReducer';
import authReducer from './authReducer';
import projectsReducer from './projectsReducer';
export default combineReducers({
    auth: authReducer,
    alerts: alertReducer,
    projects: projectsReducer
});
