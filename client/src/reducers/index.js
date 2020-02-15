import loggedReducer from './isLogged';
import counterReducer from './counter';
import usernameReducer  from './username';
import {createStore, combineReducers} from 'redux';
import userInfo from './userInfo';

function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("state", serializedState);
    } catch(error) {
        console.log(error);
    }
}

function loadFromLocalStorage() {
    try {
        const serializedState = localStorage.getItem("state");
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch(error) {
        console.log(error);
        return undefined;
    }
}

const allReducers = combineReducers({
    counter: counterReducer,
    isLogged: loggedReducer,
    username: usernameReducer,
    userInfo: userInfo
});

const persistedState = loadFromLocalStorage();

const store = createStore(
    allReducers,
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;