/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 5/24/2017.
 * (C) BIT TECHNOLOGIES
 */

import React from 'react';
import {connect} from "react-redux";
import { Link, withRouter } from 'react-router';

import {getPath} from 'common/common-functions';
import { AuthService } from 'modules/services/REST/authentication/auth.service';
import {Hero, HeroHeader, HeroHeader2 } from 'modules/website/template/components/hero.component';
import {ForumsButtons} from 'modules/forums/components/forums-buttons.component';
import {PreviewForum} from './../forums/view-forum/previewForum.component';

import {
    PanelContainer,
    Label,
} from '@sketchpixy/rubix';

@withRouter
@connect(
    state => ({
        userAuthenticated : state.userAuthenticated,
    }),
    dispatch => ({dispatch}),
)
export class DisplayContent extends React.Component {

    constructor(props){
        super(props);

        this.AuthService = new AuthService(props.dispatch);

    }

    render() {

        return (
            <PanelContainer controls={false} style={{marginBottom:0}}>

                <Hero style={{position: 'relative', zIndex: 2}}>
                    <HeroHeader>
                        <span>What's hot on SkyHub</span>
                    </HeroHeader>

                    <ForumsButtons/>

                    <p className='text-center' style={{marginTop: 25}}>
                        Already have a <strong>existing React project</strong> and not willing to make the transition to our starter-kits? No worries! We are now providing Rubix as a module which you can <strong>directly import</strong> into your existing projects.
                    </p>
                    <p className='text-center' style={{marginTop: 25}}>
                        Rubix 4.0 allows you to create static sites using a feature called <strong>distributables</strong>. These distributables can be deployed directly to any static server (e.g. Apache2 / Nginx etc).
                    </p>

                    <PreviewForum/>

                </Hero>

            </PanelContainer>
        );
    }
}
