/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 5/16/2017.
 * (C) BIT TECHNOLOGIES
 */

import React from 'react';
import { Link, withRouter } from 'react-router';
import {connect} from "react-redux";

import {Hero,HeroHeader, HeroHeader2 } from '../../template/components/hero.component';

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
                <Hero className='text-center hidden-xs' style={{height: 475, backgroundImage: 'url(/imgs/app/homepage/background.png)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', overflow: 'hidden'}}>
                    <HeroHeader style={{color:'white'}}>
                        <span>{"SkyHub Forum social network"}</span>
                        <sup><Label className='bg-deepred fg-white'>2</Label></sup>
                    </HeroHeader>
                    <HeroHeader2>{"Embrace React "}<sup><small><Label className='bg-deepred fg-white'>v15.3.1</Label></small></sup></HeroHeader2>
                    <Grid>
                        <Row>
                            <Col sm={7} collapseLeft collapseRight>
                                <p style={{marginTop: 60}}>
                                    Rubix is built on top of React which uses a Virtual DOM implementation for ultra-high performance and semantic markup coupled with CommonJS for composable Components.
                                </p>
                                <p>The result: <strong>clean and elegant code.</strong></p>
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
