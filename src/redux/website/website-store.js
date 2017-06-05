/*
    REDUX USAGE TUTORIAL https://www.youtube.com/watch?v=nrg7zhgJd4w&t=85s
 */

import {combineReducers, createStore,  applyMiddleware} from "redux";

import {UserReducer, defaultUserState} from './reducers/UserAuthenticated.reducer';
import {SocketStatusReducer, defaultSocketStatus} from './reducers/SocketStatus.reducer';
import {LocalizationReducer, defaultLocalization} from './reducers/Localization.reducer';
import {RouterStatusReducer, defaultRouterState} from './reducers/RouterState.reducer';

const reducers = combineReducers ({
    userAuthenticated : UserReducer,
    socketStatus : SocketStatusReducer,
    localization : LocalizationReducer,

    routerState : RouterStatusReducer,
});

var websiteStore = createStore(reducers, {

    userAuthenticated: defaultUserState, //Current User Authenticated
    socketStatus : defaultSocketStatus, //Socket Status
    localization :  defaultLocalization, //Location

    routerState : defaultRouterState, //Router Arguments

});

exports.websiteStore = websiteStore;


/*
    Calling an action:

        WebsiteStore.dispatch(UserAuthenticatedActions.newUserAuthenticated(userLogged));
        WebsiteStore.dispatch({type: "NEW_USER_AUTHENTICATED", status: {} });
 */