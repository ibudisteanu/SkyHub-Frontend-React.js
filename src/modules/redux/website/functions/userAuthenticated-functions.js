// module.exports = {
//
//     isLoggedIn: function (userState){
//         if (usetState.user === null) return false;
//         if (userState.user == {}) return false;
//
//         if (!userState.user.hasOwnProperty('loggedIn')) return false;
//
//         return userState.user.loggedIn;
//     }
// };

export function isLoggedIn (userState) {

    console.log('status **********************:');
    console.log(userState);

    return userState.user.loggedIn || false;
}

