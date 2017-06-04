/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 6/4/2017.
 * (C) BIT TECHNOLOGIES
 */
/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 5/24/2017.
 * (C) BIT TECHNOLOGIES
 */

import React from 'react';
import {connect} from "react-redux";
import { Link, withRouter } from 'react-router';

import {getPath} from 'common/common-functions';
import { AuthService } from 'modules/services/REST/authentication/auth.service';
import { ContentService } from 'modules/services/REST/forums/content/content.service';

import {Forum} from '../forums/models/Forum.model.js';
import {PreviewForum} from './../forums/view-forum/previewForum.component';

@withRouter
@connect(
    state => ({
        userAuthenticated : state.userAuthenticated,
    }),
    dispatch => ({dispatch}),
)
export class PreviewContent extends React.Component {

    constructor(props){
        super(props);

        this.ContentService = new ContentService(props.dispatch);

    }

    renderForum(){
        let forum = new Forum(this.props.object);

        return (
            <PreviewForum key={forum.id} forum = {forum} />
        )
    }

    render() {
        
        var extractedIdData = this.ContentService.extractDataFromIds(this.props.object.id);

        return (
            <div>

                { (extractedIdData.objectType||'') === 'frm' ? ::this.renderForum() : '' }

            </div>
        );
    }
}
