/**
 * Created by ERAZER-ALEX on 6/4/2017.
 */

import {SocketService} from 'modules/services/REST/socket/socket.service';
import * as UserAuthenticatedActions from 'redux/website/actions/userAuthenticated-actions.js';

let forumServiceInstance = null;

export class ContentService {

    dispatch = null;
    SocketService = null;

    constructor(dispatch) {

        if (forumServiceInstance === null){

            this.SocketService = new SocketService(dispatch);
            this.dispatch = dispatch;

            forumServiceInstance = this;
        }

        return forumServiceInstance;
    }

    async fetchTopContent(parent){

        return new Promise( (resolve)=> {

            //Using Promise
            this.SocketService.sendRequestGetDataPromise("content/get-top-content",{parent: parent})

                .then( (resData ) => {

                    console.log('Answer from content ', resData);

                    resolve(resData);
                });

        });

    }



}