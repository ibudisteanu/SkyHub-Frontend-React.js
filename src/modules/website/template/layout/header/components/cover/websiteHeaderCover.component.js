/**
 * Created by BIT TECHNOLOGIES on 5/28/2017.
 */

import React from 'react';
import {HeaderCover} from './headerCover.component';

import {
    Row,
    Col,
    Icon,
    Grid,
    Panel,
    Image,
    Button,
    PanelBody,
    PanelHeader,
    PanelFooter,
    FormControl,
    PanelContainer,
} from '@sketchpixy/rubix';


export class WebsiteHeaderCover extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            follow: 'follow me',
            followActive: false,
            likeCount: 999,
            likeActive: false,
            likeTextStyle: 'fg-white'
        };
    }

    render() {
        return (

                <HeaderCover title="SkyHub - Forum 2.0"
                             subTitle="Discover, Connect and Change the world together"
                             coverPic = "http://spitfiresocial.com/wp-content/uploads/2015/03/worldsocial.jpg">

                </HeaderCover>

        );
    }
}