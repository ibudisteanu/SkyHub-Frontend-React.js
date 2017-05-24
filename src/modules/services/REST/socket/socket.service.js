import * as io from 'socket.io-client';

import { Observable, Subscribable } from 'rxjs/Observable';

import {CookiesService} from '../../cookies/cookies.service';

import * as SocketStatusActions from 'redux/website/actions/socketStatus-actions';

let socketServiceInstance = null;

export class SocketService {

    socket = null;
    dispatch = null;

    sServerSocketAddress = "myskyhub.ddns.net:3000";
    sServerSocketApi = "api/";

    sServerSocketVersion = "";

    constructor(dispatch) {

        console.log('Socket Client constructor');

        if (!socketServiceInstance){

            console.log('Socket Client constructor instance...');

            this.dispatch = dispatch;
            socketServiceInstance = this;

            //this.sServerSocketAddress = this.config.Socket_Server
            //this.sServerSocketApi = this.config.Socket_Server_API

            this.createClientSocketDocumentReady();
        }

        return socketServiceInstance;

    }


    createClientSocketDocumentReady (){
        this.createClientSocketInterval = setInterval(::this.createClientSocket,500);
        this.createClientSocket();
    }

    createClientSocket() {

        if ((typeof window === "undefined") || (typeof window.document === "undefined")) return; //in case it is not executed on the Client Browser

        console.log('Client Socket Constructor');

        this.socket = io.connect(this.sServerSocketAddress, {
            query: "token=" + CookiesService.getTokenCookie() //JWT Token
        });

        this.setSocketReadObservable("connect").subscribe(response => {

            console.log('Client has connected to the server!');
            this.dispatch(SocketStatusActions.socketConnectionSuccessfully());
        });

        this.socket.on("connect_failed",function () {
            console.log('Connecting failed 222');
        });

        this.setSocketReadObservable("connect_error").subscribe(response => {
            console.log('Connecting Error');
            this.dispatch(SocketStatusActions.socketConnectingError());
        });

        this.socket.on("error",function () {
            console.log('error 222');
        });


        this.socket.on('api/news', function (res) {
            console.log('news');
            console.log(res);
        });

        // THE SAME CODE written but using OBSERVABLE
        this.setSocketReadObservable("connectionReady").subscribe(response => {

                console.log("Connection Ready: " + response);

                this.sendRequestObservable("version", '').subscribe(response => {

                    this.sServerSocketVersion = response.version;

                    console.log("API VERSION: " + response.version);
                });
            }
        );


        // Add a connect listener
        this.socket.on('api/message', function (data) {
            console.log('Received a message from the server!', data);
        });

        // Add a disconnect listener
        this.setSocketReadObservable("disconnect").subscribe(response => {

            console.log('The client has disconnected!');
            this.dispatch(SocketStatusActions.socketDisconnected());
        });

        clearInterval(this.createClientSocketInterval);
    }

    /*
     FUNCTIONS
     */

    sendRequest(sRequestName, sRequestData) {

        //console.log('sending'+sRequestName); console.log(sRequestData);

        if ((sRequestName !== '') || (sRequestData !== ''))
            return this.socket.emit(this.sServerSocketApi + sRequestName, sRequestData);
    }

    /*
     Sending the Request and Obtain the Promise to Wait Async
     */
    sendRequestGetDataPromise(sRequestName, sRequestData) {
        return new Promise((resolve) => {

            this.sendRequest(sRequestName, sRequestData);

            this.socket.on(this.sServerSocketApi + sRequestName, function (resData) {

                /*console.log('SOCKET RECEIVED: ');
                 console.log(resData);*/

                resolve(resData);

            });

        });
    }

    sendMessage(msg) {
        return this.sendRequest("message", msg);
    }

    /*
     Sending Request and Obtain the Observable Object
     */
    sendRequestObservable(sRequestName, sRequestData) {

        var result = this.sendRequest(sRequestName, sRequestData);

        return this.setSocketReadObservable(sRequestName);
    }

    setSocketReadObservable(sRequestName) {

        if ((sRequestName !== "connect") && (sRequestName !== "disconnect") && (sRequestName !== 'connect_failed')&&(sRequestName !== 'connect_error'))
            sRequestName = this.sServerSocketApi + sRequestName;

        //let observable = new Observable < Object > (observer => {
        let observable = Observable.create(observer => {
                this.socket.on(sRequestName, (data) => {
                    observer.next(data);
                });
            });

        console.log("OBSERVABLE",observable);
        return observable;
    }

}