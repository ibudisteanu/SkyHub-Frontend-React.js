export class User {

    loggedIn = false;

    firstName;
    lastName;
    email;
    username;

    profilePic;
    coverPic;

    preferredLang;
    connected = false;

    country;
    city;

    dtCreation;
    dtLastActivity;

    constructor( data: Object = {}) {


        this.firstName = data.firstName || '';
        this.lastName = data.lastName || '';

        this.email = data.email || '';
        this.username = data.username || '';

        this.preferredLang = data.preferredLang || data.language || null;
        this.connected = data.connected || false;

        this.profilePic = data.profilePic || '';
        this.coverPic  = data.coverPic || '';

        this.country = data.country || '';
        this.city = data.city || '';
        this.dtCreation = data.dtCreation || Date.now();
        this.dtLastActivity = data.dtLastActivity || Date.now();

        console.log('User assigned');
    }

    getName() {
        return this.firstName + ' ' + this.lastName;
    }

    isLoggedIn(){
        return this.loggedIn || false;
    }
}
