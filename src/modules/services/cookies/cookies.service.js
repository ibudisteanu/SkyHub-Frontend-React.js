/*
 TUTORIAL BASED on http://stackoverflow.com/questions/34298133/angular-2-cookies
 */

export class CookiesService {

    static getTokenCookie(){
        return this.readCookie2('token');
    }

    static readCookie(cookieName) {
        var theCookie=" "+document.cookie;
        var ind=theCookie.indexOf(" "+cookieName+"=");
        if (ind==-1) ind=theCookie.indexOf(";"+cookieName+"=");
        if (ind==-1 || cookieName=="") return "";
        var ind1=theCookie.indexOf(";",ind+1);
        if (ind1==-1) ind1=theCookie.length;
        return theCookie.substring(ind+cookieName.length+2,ind1);
    }

    static readCookie2(a) {
        var b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
        return b ? b.pop() : '';
    }

    static deleteCookie(name) {
        this.setCookie(name, '', -1);
    }

    static setCookie(name: string, value: string, expireDays: number, path: string = '') {
        let d:Date = new Date();
        d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
        let expires:string = `expires=${d.toUTCString()}`;
        let cpath:string = path ? `; path=${path}` : '';
        document.cookie = `${name}=${value}; ${expires}${cpath}`;
    }

}