import { combineReducers } from 'redux';
import roomStore from './roomReducer';
import userStore from './userReducer';

export default combineReducers({
    roomStore,
    userStore
})
