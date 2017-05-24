/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 5/24/2017.
 * (C) BIT TECHNOLOGIES
 */

import React from 'react';
import {connect} from "react-redux";
import { Link, withRouter } from 'react-router';

import {getPath} from 'common/common-functions';
import { AuthService } from 'modules/services/REST/authentication/auth.service';
import {Hero,HeroHeader, HeroHeader2 } from 'modules/website/template/components/hero.component';

import {AddForumForm} from 'modules/forums/forums/components/addForum.form.component'

import {
    ButtonToolbar,
    Button,
    Icon
} from '@sketchpixy/rubix';

@withRouter
@connect(
    state => ({
        userAuthenticated : state.userAuthenticated,
    }),
    dispatch => ({dispatch}),
)
export class ForumsButtons extends React.Component {

    constructor(props){
        super(props);

        console.log("FORUM BUTTONS CONSTRUCTOR");
        this.state = {
            showAddTopicForm : props.showAddTopicForm||false,
            showAddForumForm : props.showAddForumForm||false,
            showAddReplyForm : props.showAddReplyForm||false,

            btnAddTopic : props.btnAddTopic||true,
            btnAddForum : props.btnAddForum||true,
            btnAddReply : props.btnAddReply||true,
        };

        this.AuthService = new AuthService(props.dispatch);
    }

    handleAddForum(e){
        //e.preventDefault(); e.stopPropagation();

        this.setState({
            showAddForumForm : true,
        });
    }

    handleAddTopic(e){
        e.preventDefault(); e.stopPropagation();
    }

    handleAddReply(e){
        e.preventDefault(); e.stopPropagation();
    }


    showAddForum(){
        console.log('a mers222');
        return (
            <AddForumForm/>
        )
    }

    showAddTopic(){
        return (
            <AddForumForm/>
        )
    }

    render() {

        return (
            <div>
                {console.log(this.state)}
                <ButtonToolbar>

                    {this.state.btnAddForum ? (
                        <Button bsStyle='success' rounded onClick={::this.handleAddForum}>
                            <Icon glyph='icon-fontello-users-1'/>
                        </Button>
                    ) : '' }

                    {this.state.btnAddTopic ? (
                        <Button bsStyle='primary' rounded onClick={::this.handleAddTopic}>
                            <Icon glyph='icon-fontello-pencil-1'/>
                        </Button>
                    ) : '' }

                    {this.state.btnAddReply ? (
                        <Button bsStyle='info' rounded onClick={::this.handleAddTopic}>
                            <Icon glyph='icon-fontello-chat-1'/>
                        </Button>
                    ) : '' }

                </ButtonToolbar>

                {this.state.showAddForumForm ? this.showAddForum() : 'NUUU MEEERGE'}

            </div>
        );
    }
}
