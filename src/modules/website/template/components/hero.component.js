/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 5/17/2017.
 * (C) BIT TECHNOLOGIES
 */

import React from 'react';
import classNames from 'classnames';

import {
    Grid,
} from '@sketchpixy/rubix';


export class Hero extends React.Component {
    render() {
        return (
            <div {...this.props}
                 className={classNames(this.props.className,
                     'homepage-hero')}>
                <Grid fixed>
                    {this.props.children}
                </Grid>
            </div>
        );
    }
}

export class HeroHeader extends React.Component {
    render() {
        return (
            <div {...this.props}
                 className={classNames(this.props.className,
                     'homepage-hero-header')}>
                {this.props.children}
            </div>
        );
    }
}

export class HeroHeader2 extends React.Component {
    render() {
        return (
            <div {...this.props}
                 className={classNames(this.props.className,
                     'homepage-hero-header2')}>
                {this.props.children}
            </div>
        );
    }
}