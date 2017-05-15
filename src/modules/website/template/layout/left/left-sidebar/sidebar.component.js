import React from 'react';
import {connect} from "react-redux";

import { Link, withRouter } from 'react-router';

import {getPath} from 'common/common-functions';

import {SidebarContainer} from './sidebar-container.component';

@withRouter
@connect(
    state => ({
        userAuthenticated : state.userAuthenticated,
    }),
    dispatch => ({dispatch}),
)
export default class Sidebar extends React.Component {

    renderAuthenticated(){

        return (
            <SidebarContainer/>
        );
    }


    render() {
        return (
            <div id="sidebar">

                {this.props.userAuthenticated.user.isLoggedIn() ? ::this.renderAuthenticated() : ''}

            </div>
        );
    }
}
