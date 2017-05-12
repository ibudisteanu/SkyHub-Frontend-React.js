import React from 'react';
import {connect} from "react-redux";
import { Link, withRouter } from 'react-router';

import l20n, { Entity } from '@sketchpixy/rubix/lib/L20n';

import {HeaderNavigation} from './header-menus.component';
import {SocketStatusHeaderBar} from './socket-status-header-bar.component'

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
  render() {
    return (
      <Grid id='navbar' {...this.props}>
        <Row>
          <Col xs={12}>
            <Navbar fixedTop fluid id='rubix-nav-header'>
              <Row>
                <Col xs={3} visible='xs'>
                  <SidebarBtn />
                </Col>
                <Col xs={6} sm={4}>
                  <Brand />
                </Col>
                <Col xs={3} sm={8} collapseRight className='text-right'>
                  <HeaderNavigation />
                </Col>

                <SocketStatusHeaderBar />

              </Row>
            </Navbar>
          </Col>
        </Row>
      </Grid>
    );
  }
}
