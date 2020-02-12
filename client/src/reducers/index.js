import loggedReducer from './isLogged';
import counterReducer from './counter';
import usernameReducer  from './username';
import {combineReducers} from 'redux';
import userInfo from './userInfo';

const allReducers = combineReducers({
    counter: counterReducer,
    isLogged: loggedReducer,
    username: usernameReducer,
    userInfo: userInfo
})

export default allReducers;