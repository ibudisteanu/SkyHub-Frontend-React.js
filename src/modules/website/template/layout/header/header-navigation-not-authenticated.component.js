/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on ${DATE}.
 * (C) BIT TECHNOLOGIES
 */

import React from 'react';

import {AuthenticationModal} from "modules/users/authentication/modals/authentication.modal";
import * as UserAuthenticatedActions from 'redux/website/actions/userAuthenticated-actions.js';


import {connect} from "react-redux";
import { Link, withRouter } from 'react-router';

import {HeaderDirectNavItem} from './components/header-direct-nav-item.component';

import {
    Nav,
    NavItem,
    } from '@sketchpixy/rubix';

@withRouter
@connect(
    state => ({
        userAuthenticated : state.userAuthenticated,
    }),
    dispatch => ({dispatch}),
)
export class HeaderNavigationNotAuthenticated extends React.Component {

    constructor(props){

        super(props);

        //console.log(props);
        console.log('Redux Stare'); console.log(props.userAuthenticated);
    }

    handleSignIn(e){
        e.preventDefault(); e.stopPropagation();
        this.authenticationModal.openLogin();

        // console.log('Redux Stare'); console.log(this.props.userAuthenticated);
        // this.props.dispatch(UserAuthenticatedActions.newUserAuthenticated({
        //     firstName : "IOnut",
        //     lastName : "Alexandru",
        // }));
    }

    handleRegister(e){
        e.preventDefault(); e.stopPropagation();
        this.authenticationModal.openRegistration();
    }

    render() {
        return (
            <Nav pullRight  style={{display: "-webkit-inline-box"}}>

                <AuthenticationModal ref={(c) => this.authenticationModal = c} />

                <HeaderDirectNavItem glyph='login-1' eventKey={3} style={{position: 'relative'}} onClick={::this.handleSignIn} text="Login" />
                <HeaderDirectNavItem glyph='users' eventKey={3} style={{position: 'relative'}} onClick={::this.handleRegister} text="Register" />

            </Nav>
        );
    }
}