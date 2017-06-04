/**
 * Created by ERAZER-ALEX on 6/4/2017.
 */

import {SocketService} from 'modules/services/REST/socket/socket.service';
import * as UserAuthenticatedActions from 'redux/website/actions/userAuthenticated-actions.js';

let contentServiceInstance = null;

export class ContentService {

    dispatch = null;
    SocketService = null;

    constructor(dispatch) {

        if (contentServiceInstance === null){

            this.SocketService = new SocketService(dispatch);
            this.dispatch = dispatch;

            contentServiceInstance = this;
        }

        return contentServiceInstance;
    }

    async fetchTopContent(parent, pageIndex, pageCount){

        return new Promise( (resolve)=> {

            //Using Promise
            this.SocketService.sendRequestGetDataPromise("content/get-top-content",{parent: parent, pageIndex:pageIndex, pageCount: pageCount})

                .then( (resData ) => {

                    resolve(resData);
                });

        });

    }


    /*
        Loading forum/topic/reply from the Id
        sObjectId contains inside also the type of the object example: 1_frm_14958198943447852
     */

    extractDataFromIds(sObjectId){

        if (typeof sObjectId !== "string") return null;

        var iDelimitatorPosLeft = sObjectId.indexOf("_");
        var iDelimitatorPosRight = sObjectId.indexOf("_",iDelimitatorPosLeft+1);

        var iRedisDB = sObjectId.substring(0,iDelimitatorPosLeft);
        var sObjectType = sObjectId.substring(iDelimitatorPosLeft+1,iDelimitatorPosRight);

        //console.log("finding OBJECT ID: ", iRedisDB, " :::: ", sObjectType, " :::: ", sObjectId);

        if ((iRedisDB !== 0) && (sObjectType !== ''))
            return {redisDB : iRedisDB, objectType : sObjectType};
        else
            return null
    }

}