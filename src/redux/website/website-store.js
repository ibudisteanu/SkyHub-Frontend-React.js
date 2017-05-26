/*
    REDUX USAGE TUTORIAL https://www.youtube.com/watch?v=nrg7zhgJd4w&t=85s
 */

import {combineReducers, createStore,  applyMiddleware} from "redux";

import {userReducer, defaultUserState} from './reducers/userAuthenticated-reducer';
import {socketStatusReducer, defaultSocketStatus} from './reducers/socketStatus-reducer';
import {localizationReducer, defaultLocalization} from './reducers/localization-reducer';

const reducers = combineReducers ({
    userAuthenticated : userReducer,
    socketStatus : socketStatusReducer,
    localization : localizationReducer,
});

var websiteStore = createStore(reducers, {

    userAuthenticated: defaultUserState,
    socketStatus : defaultSocketStatus,
    localization :  defaultLocalization,

});

exports.websiteStore = websiteStore;


/*
    Calling an action:

        WebsiteStore.diaspath({type: "NEW_USER_AUTHENTICATED", status: {} });
 */