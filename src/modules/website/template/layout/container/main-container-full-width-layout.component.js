/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 5/15/2017.
 * (C) BIT TECHNOLOGIES
 */
import React from 'react';
import {connect} from "react-redux";

import { Link, withRouter } from 'react-router';

import { Grid, Row, Col} from '@sketchpixy/rubix';

@withRouter
@connect(
    state => ({
        userAuthenticated : state.userAuthenticated,
    }),
    dispatch => ({dispatch}),
)
export default class MainContainerFullWidthLayout extends React.Component {

    getStyle(){
        var obj = {paddingTop:0};
        if (!this.props.userAuthenticated.user.isLoggedIn())
            obj.marginLeft = 0;

        return obj;
    }

    render() {
        return (
            <div id='body' style={ this.getStyle() }>
                {this.props.children}
            </div>
        );
    }
}
