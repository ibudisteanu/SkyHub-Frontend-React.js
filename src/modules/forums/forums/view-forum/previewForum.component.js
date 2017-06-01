/**
 * Created by BIT TECHNOLOGIES on 5/28/2017.
 */

import React from 'react';
import {connect} from "react-redux";
import { Link, withRouter } from 'react-router';

import {getPath} from 'common/common-functions';
import { AuthService } from 'modules/services/REST/authentication/auth.service.js';
import {ForumsService} from 'modules/services/REST/forums/forums/forums.service';

import {Forum} from '../models/Forum.model.js';

import {
    PanelContainer,
    Panel,
    PanelHeader,
    PanelBody,
    Alert,
    Grid,
    Row,
    Col,
} from '@sketchpixy/rubix';

@withRouter
@connect(
    state => ({
        userAuthenticated : state.userAuthenticated,
    }),
    dispatch => ({dispatch}),
)
export class PreviewForum extends React.Component {

    constructor(props){
        super(props);

        this.AuthService = new AuthService(props.dispatch);
        this.ForumsService = new ForumsService(props.dispatch);

        this.state = {
            forum: new Forum({title:"TEST FORUM",description:"DESCRIPTION"}),
            forumNotFound: false,
        };
    }

    componentDidMount (){
        var forumURL = this.props.forumURL || '';

        this.ForumsService.getForumAsync(forumURL).then ( (forumAnswer) => {

            this.setState({
                forum: forumAnswer,
                forumNotFound : (forumAnswer !== null),
            })

        });

    }

    renderError(){
        return (
            <Alert danger>
                <h4>Forum NOT Found</h4>
                <strong>{this.props.forumURL||""}</strong> was not found. Probably the forum you are looking for doesn't exists or has been deleted.
            </Alert>
        )
    }

    render() {


        return (
            <PanelContainer controls={false} style={{marginBottom:0}}>

                { ((this.state.forum !== null) && (this.state.forumNotFound === false))
                    ?
                    <Panel>
                        <PanelHeader style={{backgroundColor: this.state.forum.coverColor||"#79B0EC", height: 120}}>
                            <Grid>
                                <Row>
                                    <Col xs={12} className='fg-white'>
                                        <h4>{this.state.forum.title}</h4>
                                        <h6>{this.state.forum.description}</h6>
                                    </Col>
                                </Row>
                            </Grid>
                        </PanelHeader>
                        <PanelBody>
                            <Grid>
                                <Row>
                                    <Col xs={12}>
                                        <p>
                                            MISTO DE TOT
                                        </p>
                                    </Col>
                                </Row>
                            </Grid>
                        </PanelBody>
                    </Panel>

                    :

                    ::this.renderError()

                }



            </PanelContainer>
        );
    }
}
