/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 5/24/2017.
 * (C) BIT TECHNOLOGIES
 */

import React from 'react';
import {connect} from "react-redux";
import { Link, withRouter } from 'react-router';

import {getPath} from 'common/common-functions';
import {AuthService}  from 'modules/services/REST/authentication/auth.service';
import {ForumsService} from 'modules/services/REST/forums/forums/forums.service';

import {Hero, HeroHeader, HeroHeader2 } from 'modules/website/template/components/hero.component';
import {HeaderCover} from 'modules/website/template/layout/header/components/cover/HeaderCover.component';
import {WebsiteHeaderCover} from 'modules/website/template/layout/header/components/cover/WebsiteHeaderCover.component';

import {DisplayContent} from 'modules/forums/content/DisplayContent.component';

import {Forum} from 'modules/forums/forums/models/Forum.model';

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
export class ViewForum extends React.Component {

    constructor(props){
        super(props);

        this.AuthService = new AuthService(props.dispatch);
        this.ForumsService = new ForumsService(props.dispatch);

        this.state = ({

            forum : new Forum({}),
            forumNotFound : false,

        });

    }


    renderForum(){
        return (
            <div>
                <HeroHeader>
                    <span>{this.props.forum.title}</span>
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

        console.log("%%%%%%%%%%% VIEW FORUM " , this.props.forum);

        return (
            <div>

                { ((this.props.forum !== null) && (this.props.forumNotFound === false))
                    ?
                    <HeaderCover title={this.props.forum.title||""}
                                 subTitle={this.props.forum.description||""}
                                 icon={this.props.forum.iconPic||""}
                                 cover={this.props.forum.coverPic||''}
                                 backgroundColor={this.props.forum.coverColor||''} />

                    :

                    <WebsiteHeaderCover />
                }


                <Hero style={{position: 'relative', zIndex: 2}}>

                    {this.props.forum !== null ? ::this.renderForum(this.props.forum) : ::this.renderError}

                </Hero>

                <DisplayContent/>


            </div>
        )
    }
}

