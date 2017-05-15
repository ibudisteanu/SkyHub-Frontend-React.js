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
export default class MainLayout extends React.Component {


    render() {
        return (
            <div id='body' style={ this.props.userAuthenticated.user.isLoggedIn() ?  {} : {marginLeft:0} }>
                <Grid>
                    <Row>
                        <Col xs={12}>
                            {this.props.children}
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}
