/**
 * Created by BIT TECHNOLOGIES on 5/28/2017.
 */

import React from 'react';
import {connect} from "react-redux";
import { Link, withRouter } from 'react-router';

import {getPath} from 'common/common-functions';
import { AuthService } from 'modules/services/REST/authentication/auth.service';

import {Forum} from 'models/Forum.model';

import {
    PanelContainer,
    Panel,
    PanelHeader,
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
export class ViewForum extends React.Component {

    constructor(props){
        super(props);

        this.AuthService = new AuthService(props.dispatch);

    }

    render() {

        var forum = this.props.forum || new Forum({});

        return (
            <PanelContainer controls={false} style={{marginBottom:0}}>

                <Panel>
                    <PanelHeader className='bg-green'>
                        <Grid>
                            <Row>
                                <Col xs={12} className='fg-white'>
                                    <h4>Panel Body + Header without Panel Footer</h4>
                                    <h6>Mini Heading</h6>
                                </Col>
                            </Row>
                        </Grid>
                    </PanelHeader>
                    <PanelBody>
                        <Grid>
                            <Row>
                                <Col xs={12}>
                                    <p>
                                        <LoremIpsum query='5s' />
                                    </p>
                                </Col>
                            </Row>
                        </Grid>
                    </PanelBody>
                </Panel>

            </PanelContainer>
        );
    }
}
