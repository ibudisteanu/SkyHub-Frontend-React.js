/*
    REDUX USAGE TUTORIAL https://www.youtube.com/watch?v=nrg7zhgJd4w&t=85s
 */

import {combineReducers, createStore} from "redux";

import {userReducer, defaultUserState} from './reducers/userAuthenticated-reducer';
import {socketStatusReducer, defaultSocketStatus} from './reducers/socketStatus-reducer.js';

const reducers = combineReducers ({
    userAuthenticated : userReducer,
    socketStatus : socketStatusReducer,
});

var websiteStore = createStore(reducers, {

    userAuthenticated: defaultUserState,
    socketStatus : defaultSocketStatus,
});

exports.websiteStore = websiteStore;


/*
    Calling an action:

        WebsiteStore.diaspath({type: "NEW_USER_AUTHENTICATED", user: {} });
 */