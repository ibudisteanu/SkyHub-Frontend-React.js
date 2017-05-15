import React from 'react';

import {
  Sidebar, SidebarNav, SidebarNavItem,
  SidebarControls, SidebarControlBtn,
  LoremIpsum, Grid, Row, Col, FormControl,
  Label, Progress, Icon,
  SidebarDivider
} from '@sketchpixy/rubix';

import { Link, withRouter } from 'react-router';
import {connect} from "react-redux";

import {getPath} from 'common/common-functions';

import ApplicationSidebar from './components/sidebar-application.component';
import ChatComponent from '../../../../../../common/chat';
import StatisticsComponent from '../../../../../../common/statistics';
import TimelineComponent from '../../../../../../common/timeline';
import NotificationsComponent from '../../../../../../common/notifications';


@withRouter
@connect(
    state => ({
        userAuthenticated : state.userAuthenticated,
    }),
    dispatch => ({dispatch}),
)
export class SidebarContainer extends React.Component {


  getProfileName() {
      return this.props.userAuthenticated.user.firstName + ' ' + this.props.userAuthenticated.user.lastName;
  }

  render() {
    return (
      <div>
        <div id='avatar'>
          <Grid>
            <Row className='fg-white'>
              <Col xs={4} collapseRight>
                <img src={this.props.userAuthenticated.user.profilePic} width='50' height='50' style={ {marginTop: -10, marginLeft: -10}} />
              </Col>
              <Col xs={8} collapseLeft id='avatar-col'>
                <div style={{top: 23, fontSize: 16, lineHeight: 1, position: 'relative'}}>{::this.getProfileName()}</div>
                <div>
                    {this.props.userAuthenticated.user.shortBio}
                  <Progress id='demo-progress' value={30} color='#ffffff'/>
                  <Link to={getPath(this,'lock')}>
                    <Icon id='demo-icon' bundle='fontello' glyph='lock-5' />
                  </Link>
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
        <SidebarControls>
          <SidebarControlBtn bundle='fontello' glyph='docs' sidebar={0} />
          <SidebarControlBtn bundle='fontello' glyph='chat-1' sidebar={1} />
          <SidebarControlBtn bundle='fontello' glyph='chart-pie-2' sidebar={2} />
          <SidebarControlBtn bundle='fontello' glyph='th-list-2' sidebar={3} />
          <SidebarControlBtn bundle='fontello' glyph='bell-5' sidebar={4} />
        </SidebarControls>
        <div id='sidebar-container'>
          <Sidebar sidebar={0}>
            <ApplicationSidebar />
          </Sidebar>
          <Sidebar sidebar={1}>
            <ChatComponent />
          </Sidebar>
          <Sidebar sidebar={2}>
            <StatisticsComponent />
          </Sidebar>
          <Sidebar sidebar={3}>
            <TimelineComponent />
          </Sidebar>
          <Sidebar sidebar={4}>
            <NotificationsComponent />
          </Sidebar>
        </div>
      </div>
    );
  }
}
