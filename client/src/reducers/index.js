import loggedReducer from './isLogged';
import counterReducer from './counter';
import usernameReducer  from './username';
import {combineReducers} from 'redux'

const allReducers = combineReducers({
    counter: counterReducer,
    isLogged: loggedReducer,
    username: usernameReducer,
})

export default allReducers;