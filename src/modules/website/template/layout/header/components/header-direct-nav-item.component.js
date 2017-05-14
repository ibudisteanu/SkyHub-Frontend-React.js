/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on ${DATE}.
 * (C) BIT TECHNOLOGIES
 */

import React from 'react';
import {connect} from "react-redux";
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import { Link, withRouter } from 'react-router';

import {

    NavItem,
    Icon
} from '@sketchpixy/rubix';

@withRouter
export class HeaderDirectNavItem extends React.Component {
    render() {
        var active = false;
        var currentLocation = this.props.location.pathname;

        if(!active && this.props.path) {
            active = this.props.router.isActive(this.props.path) && (currentLocation == this.props.path);
        }

        var classes = classNames({
            'pressed': active
        }, this.props.className);

        return (
            <NavItem className={classes} style={this.props.style} href={this.props.path} to={this.props.path} componentClass={Link} onClick={this.props.onClick}>
                <Icon bundle={this.props.bundle || 'fontello'} className={"navbar-nav-item-icon "+this.props.iconClassName+" "} style={this.props.iconStyle}  glyph={this.props.glyph}  />
                {this.props.text !== "" ? <strong>{this.props.text}</strong> : ''}
            </NavItem>
        );
    }
}