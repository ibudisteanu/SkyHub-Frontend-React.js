/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 5/16/2017.
 * (C) BIT TECHNOLOGIES
 */
import React from 'react';
import { Link, withRouter } from 'react-router';
import {connect} from "react-redux";

import {} from 'common/common-functions.js';

import {
    Row,
    Col,
    Tab,
    Nav,
    Grid,
    Label,
    Button,
    NavItem,
} from '@sketchpixy/rubix';

@withRouter
@connect(state => ({
    userAuthenticated : state.userAuthenticated,
}))
export class AuthenticatedHomeComponent extends React.Component {

    render() {
        return (
            <div>
                HELLO WORLD

            </div>
        );
    }
}
