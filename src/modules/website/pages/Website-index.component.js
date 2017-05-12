import React from 'react';
import { Link, withRouter } from 'react-router';
import {connect} from "react-redux";

import {} from 'common/common-functions.js';

import {
} from '@sketchpixy/rubix';

@withRouter
@connect(state => ({
     userAuthenticated : state.userAuthenticated,
 }))

export default class WebsiteIndex extends React.Component {

    render() {
        return (
            <div>
                HELLO WORLD
            </div>
        );
    }
}
