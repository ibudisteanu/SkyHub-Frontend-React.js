/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 5/16/2017.
 * (C) BIT TECHNOLOGIES
 */

import React from 'react';
import { Link, withRouter } from 'react-router';
import {connect} from "react-redux";

import {Hero,HeroHeader, HeroHeader2 } from 'modules/website/template/components/hero.component';

import {
    Row,
    Col,
    Grid,
    Label,
} from '@sketchpixy/rubix';

@withRouter
@connect(state => ({
    userAuthenticated : state.userAuthenticated,
}))
export class HomeComponent extends React.Component {

    render() {
        return (
            <div>
                <Hero className='text-center' style={{height: 475, backgroundImage: 'url(/imgs/app/homepage/background.png)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', overflow: 'hidden'}}>
                    <HeroHeader style={{color:'white'}}>
                        <span>{"SkyHub Forum social network"}</span>
                        <sup><Label className='bg-deepred fg-white'>2</Label></sup>
                    </HeroHeader>
                    <HeroHeader2>{"Embrace React "}<sup><small><Label className='bg-deepred fg-white'>v15.3.1</Label></small></sup></HeroHeader2>
                    <Grid>
                        <Row>
                            <Col sm={7} collapseLeft collapseRight>
                                <p style={{marginTop: 60}}>
                                    SkyHub is a new Social Network that allows people to <strong>discover, talk and change </strong> the world together
                                </p>
                                <p> <strong>Register</strong> now to SkyHub</p>
                            </Col>
                            <Col sm={5} collapseLeft collapseRight>
                                <div className='hidden-xs text-right'>
                                    <img src='/imgs/app/homepage/reactcode.png' />
                                </div>
                                <div className='visible-xs text-center'>
                                    <img width='250' src='/imgs/app/homepage/reactcode.png' />
                                </div>
                            </Col>
                        </Row>
                    </Grid>
                </Hero>




            </div>
        );
    }
}
