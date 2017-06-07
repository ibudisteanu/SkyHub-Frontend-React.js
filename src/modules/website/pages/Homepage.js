import React from 'react';
import { Link, withRouter } from 'react-router';
import {connect} from "react-redux";

import {} from 'common/common-functions.js';
import {HomeComponent} from './home/Home.component';
import {AuthenticatedHomeComponent} from './authenticated/Authenticated-home.component';
import {HomepageContent} from './HomepageContent.component';

import {DisplayContent} from 'modules/forums/content/DisplayContent.component';
import {HTTPService} from 'modules/services/REST/http/http.service';

import {
    Alert,
    Row,
    Col,
} from '@sketchpixy/rubix';

@withRouter
@connect(state => ({
    userAuthenticated : state.userAuthenticated,
    routerState : state.routerState,
}))
export default class Homepage extends React.Component {

    constructor(props){

        super(props);

        this.state=({
            contentObject : null,
            contentObjectNotFound: false,
        });

    }

    componentWillMount(){
        let sContentToSearchId = '';

        let sURL = this.props.params.URL || '';

        if (sURL !== '') {
            sURL = sURL.replace('ltr/','');
            sContentToSearchId = sURL;
        }

        if (sContentToSearchId !== '')
            HTTPService.postRequest("content/get-content", {id: sContentToSearchId} ).then ( (answer)=>{

                console.log("");console.log("");console.log("");console.log("");
                console.log("GET CONTENT ANSWER FROM SERVER: ",sContentToSearchId," answer ",answer);

                if (answer.data.result === true){

                    this.state = ({
                        contentObject: answer.data.content,
                        contentObjectNotFound: false,
                    })

                } else
                if (answer.data.result === false){
                    this.state = ({
                        contentObject: null,
                        contentObjectNotFound: true,
                    })
                }

            });

    }

    renderError(){
        return (
            <Row>
                <Col xs={12} sm={8} smOffset={2} md={6} mdOffset={3}>
                    <Alert danger>
                        <h4>NOT Found</h4>
                        <strong>{this.props.params.URL||""}</strong> was not found. Probably what you've been looking for doesn't exists or has been deleted in the mean while.
                    </Alert>
                </Col>
            </Row>
        )
    }

    renderSimpleWebsite(){
        return (

            <div>
                {
                    this.props.userAuthenticated.user.isLoggedIn()
                ?
                    <AuthenticatedHomeComponent/>

                :

                    <HomeComponent/>
                }

                <DisplayContent/>
            </div>

        )
    }

    renderHomepageComponent(){
        return (
            <HomepageContent object={this.state.contentObject} objectNotFound={this.state.contentObjectNotFound} />
        )

    }

    render() {
        return (
            <div>

                {this.state.contentObject === null ? ::this.renderSimpleWebsite() : ::this.renderHomepageComponent()}

                {this.state.notFound ? ::this.renderError() : this.state.notFound+'KAKAT'}



            </div>
        );
    }
}
