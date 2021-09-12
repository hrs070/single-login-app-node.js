import { combineReducers } from 'redux';

import authReducer from './authReducer.js';
import signinStateReducer from './signinStatusReducer.js';

export default combineReducers({ authReducer, signinStateReducer });