import { combineReducers } from 'redux';
import authReducer from './authReducer';
import ridesReducer from "./ridesReducer";

export default combineReducers({
    auth: authReducer,
    rides: ridesReducer,
});
