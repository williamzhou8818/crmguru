import { combineReducers } from 'redux';
import contactReducer from './ContactReducer';
import authReducer from './AuthReducer';

export default combineReducers({
    contact: contactReducer,
    auth: authReducer
});