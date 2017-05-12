export const defaultUserState = {
    user:{
        id : null,
        loggedIn : false,
        firstName : '',
        lastName : '',
    },
    error : '',
};

export function userReducer  ( state = defaultUserState, action)  {

    let newState = state;

    switch (action.type) {

        case 'NEW_USER_AUTHENTICATED':

            action.user.loggedIn = true;
            newState = {
                user: action.user,
                error: '',
            };

            break;

        case 'LOGOUT_USER':

            newState = {
                user: defaultUserState,
                error: '',
            };

            break;
    }

    return newState;
};

