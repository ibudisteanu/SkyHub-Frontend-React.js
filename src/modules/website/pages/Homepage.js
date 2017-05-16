import React from 'react';
import { Link, withRouter } from 'react-router';
import {connect} from "react-redux";

import {} from 'common/common-functions.js';
import {HomeComponent} from './home/Home.component';
import {AuthenticatedHomeComponent} from './authenticated/Authenticated-home.component';

import {
} from '@sketchpixy/rubix';

@withRouter
@connect(state => ({
     userAuthenticated : state.userAuthenticated,
 }))
export default class Homepage extends React.Component {

    renderAuthenticatedHome(){
        return (
            <AuthenticatedHomeComponent/>
        )
    }

    renderHome(){
        return (
            <HomeComponent/>
        )
    }

    render() {
        return (
            <div>
                {this.props.userAuthenticated.user.isLoggedIn() ? ::this.renderAuthenticatedHome() : ::this.renderHome()}

            </div>
        );
    }
}
