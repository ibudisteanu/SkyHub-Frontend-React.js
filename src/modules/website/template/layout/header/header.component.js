import React from 'react';
import {connect} from "react-redux";
import { Link, withRouter } from 'react-router';

import l20n, { Entity } from '@sketchpixy/rubix/lib/L20n';

import {HeaderNavigationAuthenticated} from './header-navigation-authenticated.component';
import {HeaderNavigationNotAuthenticated} from './header-navigation-not-authenticated.component';
import {HeaderBarSocketStatus} from './header-bar-socket-status.component'

import {
  SidebarBtn,
  Navbar,
  Grid,
  Row,
  Col } from '@sketchpixy/rubix';

class Brand extends React.Component {
  render() {
    return (
      <Navbar.Header {...this.props}>
        <Navbar.Brand tabIndex='-1'>
          <a href='#'>
            <img src='/imgs/common/logo.png' alt='rubix' width='111' height='28' />
          </a>
        </Navbar.Brand>
      </Navbar.Header>
    );
  }
}


@withRouter
@connect(state => ({
    userAuthenticated : state.userAuthenticated,
}))
export default class Header extends React.Component {

  renderNavigationAuthenticated(){
    return (
        <HeaderNavigationAuthenticated/>
    );
  }

  renderNavigationNotAuthenticated(){
      return (
          <HeaderNavigationNotAuthenticated/>
      );
  }

  render() {
    return (
      <Grid id='navbar' {...this.props}>
        <Row>
          <Col xs={12}>
            <Navbar fixedTop fluid id='rubix-nav-header'>
              <Row>
                <Col xs={1} visible='xs'>
                  <SidebarBtn />
                </Col>
                <Col xs={3} sm={3}>
                  <Brand />
                </Col>
                <Col className='text-right' style={{paddingRight:0}}>

                    { this.props.userAuthenticated.user.isLoggedIn() ? ::this.renderNavigationAuthenticated() : ::this.renderNavigationNotAuthenticated() }

                </Col>

                <HeaderBarSocketStatus />


              </Row>
            </Navbar>
          </Col>
        </Row>
      </Grid>
    );
  }
}
