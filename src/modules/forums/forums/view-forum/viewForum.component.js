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

import {DisplayContent} from 'modules/forums/content/displayContent.component';

import {newRouterForumArgumentAction} from 'redux/website/actions/RouterState.actions';

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
        routerState : state.routerState,
    }),
    dispatch => ({dispatch}),
)
export default class ViewForum extends React.Component {

    constructor(props){
        super(props);

        this.AuthService = new AuthService(props.dispatch);
        this.ForumsService = new ForumsService(props.dispatch);

    }

    componentDidMount (){

        //I have a forumURL to process

        let forumURL = this.props.params.forumURL || '';

        this.ForumsService.getForumAsync(forumURL).then ( (forumAnswer) => {

            this.props.dispatch(newRouterForumArgumentAction(forumAnswer, (forumAnswer !== null) ));

        });

    }


    renderForum(){
        return (
            <div>
                <HeroHeader>
                    <span>{this.props.routerState.forum.forum.title}</span>
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

        console.log("%%%%%% PARAMS",this);

        return (
            <div>

                { ((this.props.routerState.forum.forum !== null) && (this.props.routerState.forum.forumNotFound === false))
                    ?
                    <HeaderCover title={this.props.routerState.forum.forum.title||""}
                                 subTitle={this.props.routerState.forum.forum.description||""}
                                 icon={this.props.routerState.forum.forum.iconPic||""}
                                 cover={this.props.routerState.forum.forum.coverPic||''}
                                 backgroundColor={this.props.routerState.forum.forum.coverColor||''} />

                    :

                    <WebsiteHeaderCover />
                }


                <Hero style={{position: 'relative', zIndex: 2}}>

                    {this.props.routerState.forum.forum !== null ? ::this.renderForum(this.props.routerState.forum.forum) : ::this.renderError}

                </Hero>

                <DisplayContent/>

            </div>
        )
    }
}

