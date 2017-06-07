/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 6/6/2017.
 * (C) BIT TECHNOLOGIES
 */


import React from 'react';
import {connect} from "react-redux";
import { Link, withRouter } from 'react-router';

import {getPath} from 'common/common-functions';
import { AuthService } from 'modules/services/REST/authentication/auth.service';


import {Forum} from '../../forums/forums/models/Forum.model.js';
import {ViewForum} from '../../forums/forums/view-forum/ViewForum.component';

@withRouter
@connect(
    state => ({
        userAuthenticated : state.userAuthenticated,
    }),
    dispatch => ({dispatch}),
)
export class HomepageContent extends React.Component {

    constructor(props){
        super(props);

        this.ContentService = new ContentService(props.dispatch);

    }

    componentDidMount (){

        //I have a forumURL to process

        // let URL = this.props.params.forumURL || '';
        //
        // this.ForumsService.getForumAsync(forumURL).then ( (forumAnswer) => {
        //
        //     this.props.dispatch(newRouterForumArgumentAction(forumAnswer, (forumAnswer !== null) ));
        //
        // });

    }

    renderForum(){
        let forum = new Forum(this.props.object);

        //console.log("%%%%%%%%%%%RENDER FORUM ",this.props.object);

        return (
            <ViewForum key={forum.id} forum={forum} forumNotFound={this.props.objectNotFound} />
        )
    }

    render() {

        let extractedIdData = this.ContentService.extractDataFromIds(this.props.object.id);
        let objectType = extractedIdData.objectType || '';

        switch (objectType){
            case 'frm':
                return this.renderForum();
            case 'us':
                return this.renderForum();
            case 'top':
                return this.renderForum();
        }

    }
}
