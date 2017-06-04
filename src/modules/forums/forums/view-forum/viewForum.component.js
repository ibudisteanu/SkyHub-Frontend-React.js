/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 5/24/2017.
 * (C) BIT TECHNOLOGIES
 */

import React from 'react';
import {connect} from "react-redux";
import { Link, withRouter } from 'react-router';

import {getPath} from 'common/common-functions';
import {AuthService}  from 'modules/services/REST/authentication/auth.service.js';
import {ForumsService} from 'modules/services/REST/forums/forums/forums.service';

import {Hero, HeroHeader, HeroHeader2 } from 'modules/website/template/components/hero.component';
import {Forum} from '../models/Forum.model.js';
import {HeaderCover} from 'modules/website/template/layout/header/components/cover/headerCover.component';
import {WebsiteHeaderCover} from 'modules/website/template/layout/header/components/cover/websiteHeaderCover.component';

import {DisplayContent} from 'modules/forums/content/displayContent.component';

import {
    PanelContainer,
    Panel,
    PanelHeader,
    Grid,
    Row,
    Col,
    Alert,
} from '@sketchpixy/rubix';

@withRouter
@connect(
    state => ({
        userAuthenticated : state.userAuthenticated,
    }),
    dispatch => ({dispatch}),
)
export default class ViewForum extends React.Component {

    constructor(props){
        super(props);

        this.AuthService = new AuthService(props.dispatch);
        this.ForumsService = new ForumsService(props.dispatch);

        this.state = {
            forum: new Forum({}),
            forumNotFound: false,
        };

    }

    componentDidMount (){
        var forumURL = this.props.params.forumURL || '';

        this.ForumsService.getForumAsync(forumURL).then ( (forumAnswer) => {

            this.setState({
                forum: forumAnswer,
                forumNotFound : (forumAnswer !== null),
            })

        });

    }


    renderForum(){
        return (
            <div>
                <HeroHeader>
                    <span>{this.state.forum.title}</span>
                </HeroHeader>

            </div>

        )
    }

    renderError(){
        return (
            <Alert danger>
                <h4>Forum NOT Found</h4>
                <strong>{this.props.params.forumURL||""}</strong> was not found. Probably the forum you are looking for doesn't exists or has been deleted.
            </Alert>
        )
    }

    render() {

        return (
            <div>

                { ((this.state.forum !== null) && (this.state.forumNotFound === false))
                    ?
                    <HeaderCover title={this.state.forum.title||""}
                                 subTitle={this.state.forum.description||""}
                                 icon={this.state.forum.iconPic||""}
                                 cover={this.state.forum.coverPic||''}
                                 backgroundColor={this.state.forum.coverColor||''} />

                    :

                    <WebsiteHeaderCover />
                }


                <Hero style={{position: 'relative', zIndex: 2}}>

                    {this.state.forum !== null ? ::this.renderForum(this.state.forum) : ::this.renderError}

                </Hero>

                <DisplayContent/>

            </div>
        )
    }
}

