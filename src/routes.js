import React from 'react';
import { Provider} from "react-redux";
import {SocketProvider, socketConnect,} from 'socket.io-react';

import classNames from 'classnames';
import { IndexRoute, Route } from 'react-router';

import { Grid, Row, Col, MainContainer } from '@sketchpixy/rubix';

/*
 LOADING stores
 */


import {websiteStore} from "./redux/website/website-store";

/* Common Components */

import Sidebar from './modules/website/template/layout/left/left-sidebar/sidebar.component';
import MainContainerLayout from './modules/website/template/layout/container/main-container-layout.component';
import MainContainerFullWidthLayout from './modules/website/template/layout/container/main-container-full-width-layout.component';
import Header from './modules/website/template/layout/header/header.component';
import Footer from './common/footer';

/* Pages */

import Homepage2 from './modules/website/pages/Homepage2';
import Homepage from './modules/website/pages/Homepage';
import ViewForum from './modules/forums/forums/view-forum/ViewForum.component';

import Dashboard from './routes/Dashboard';

import Inbox from './routes/Inbox';
import Mail from './routes/Mail';
import Compose from './routes/Compose';

import Gallery from './routes/Gallery';

import Social from './routes/Social';

import Posts from './routes/Posts';
import Post from './routes/Post';

import Panels from './routes/Panels';

import LineSeries from './routes/LineSeries';
import AreaSeries from './routes/AreaSeries';
import BarColSeries from './routes/BarColSeries';
import MixedSeries from './routes/MixedSeries';
import PieDonutSeries from './routes/PieDonutSeries';

import Chartjs from './routes/Chartjs';
import C3js from './routes/C3js';
import Morrisjs from './routes/Morrisjs';

import StaticTimeline from './routes/StaticTimeline';
import InteractiveTimeline from './routes/InteractiveTimeline';

import Codemirrorjs from './routes/Codemirrorjs';
import Maps from './routes/Maps';
import Editor from './routes/Editor';

import Buttons from './routes/Buttons';
import Dropdowns from './routes/Dropdowns';
import TabsAndNavs from './routes/TabsAndNavs';
import Sliders from './routes/Sliders';
import Knobs from './routes/Knobs';
import Modals from './routes/Modals';
import Messengerjs from './routes/Messengerjs';

import Controls from './routes/Controls';
import XEditable from './routes/XEditable';
import Wizard from './routes/Wizard';

import Tables from './routes/Tables';
import Datatablesjs from './routes/Datatablesjs';
import Tablesawjs from './routes/Tablesawjs';

import Grids from './routes/Grids';
import Calendar from './routes/Calendar';

import Dropzonejs from './routes/Dropzonejs';
import Cropjs from './routes/Cropjs';

import Fonts from './routes/Fonts';

import LoginPage from './modules/users/authentication/login/login.page';
import RegistrationPage from './modules/users/authentication/registration/registration.page';

import Invoice from './routes/Invoice';
import Pricing from './routes/Pricing';

import Lock from './routes/Lock';

import SocketClient from './modules/services/REST/socket/socket.service';


class App extends React.Component {
    render() {
        return (
            //<SocketProvider socket={SocketClient}>
            <Provider store = {websiteStore}>
                <MainContainer {...this.props}>

                    <Sidebar />

                    <Header />

                    <MainContainerLayout children={this.props.children}/>


                    <Footer />
                </MainContainer>
            </Provider>
            //  </SocketProvider>
        );
    }
}

class AppFullWidth extends React.Component {
    render() {
        return (
            //<SocketProvider socket={SocketClient}>
            <Provider store = {websiteStore}>
                <MainContainer  {...this.props} >

                    <Sidebar />

                    <Header />

                    <MainContainerFullWidthLayout children={this.props.children}/>

                </MainContainer >
            </Provider>
            //  </SocketProvider>
        );
    }
}

/**
 * Includes Sidebar, Header and Footer.
 */

const routes = (

  <Route component={App}>

    <Route path='dashboard' component={Dashboard} />
    <Route path='mailbox/inbox' component={Inbox} />
    <Route path='mailbox/mail' component={Mail} />
    <Route path='mailbox/compose' component={Compose} />
    <Route path='gallery' component={Gallery} />
    <Route path='social' component={Social} />
    <Route path='blog/posts' component={Posts} />
    <Route path='blog/post' component={Post} />
    <Route path='panels' component={Panels} />
    <Route path='charts/rubix/line' component={LineSeries} />
    <Route path='charts/rubix/area' component={AreaSeries} />
    <Route path='charts/rubix/barcol' component={BarColSeries} />
    <Route path='charts/rubix/mixed' component={MixedSeries} />
    <Route path='charts/rubix/piedonut' component={PieDonutSeries} />
    <Route path='charts/chartjs' component={Chartjs} />
    <Route path='charts/c3js' component={C3js} />
    <Route path='charts/morrisjs' component={Morrisjs} />
    <Route path='timeline' component={StaticTimeline} />
    <Route path='interactive-timeline' component={InteractiveTimeline} />
    <Route path='codemirror' component={Codemirrorjs} />
    <Route path='maps' component={Maps} />
    <Route path='editor' component={Editor} />
    <Route path='ui-elements/buttons' component={Buttons} />
    <Route path='ui-elements/dropdowns' component={Dropdowns} />
    <Route path='ui-elements/tabs-and-navs' component={TabsAndNavs} />
    <Route path='ui-elements/sliders' component={Sliders} />
    <Route path='ui-elements/knobs' component={Knobs} />
    <Route path='ui-elements/modals' component={Modals} />
    <Route path='ui-elements/messenger' component={Messengerjs} />
    <Route path='forms/controls' component={Controls} />
    <Route path='forms/x-editable' component={XEditable} />
    <Route path='forms/wizard' component={Wizard} />
    <Route path='tables/bootstrap-tables' component={Tables} />
    <Route path='tables/datatables' component={Datatablesjs} />
    <Route path='tables/tablesaw' component={Tablesawjs} />
    <Route path='grid' component={Grids} />
    <Route path='calendar' component={Calendar} />
    <Route path='file-utilities/dropzone' component={Dropzonejs} />
    <Route path='file-utilities/crop' component={Cropjs} />
    <Route path='fonts' component={Fonts} />
    <Route path='invoice' component={Invoice} />
    <Route path='pricing' component={Pricing} />
  </Route>

);

/**
 * No Sidebar, Header or Footer. Only the Body is rendered.
 */
const basicRoutes = (
  <Route component={AppFullWidth}>

    <Route path='/' component={Homepage} />
    <Route path=':URL' component={Homepage} />

    <Route path='homepage2' component={Homepage2} />
    <Route path='homepage1' component={Homepage} />

    <Route path='lock' component={Lock} />
    <Route path='login' component={LoginPage} />
    <Route path='registration' component={RegistrationPage} />
    <Route path='register' component={RegistrationPage} />


  </Route>
);

const combinedRoutes = (
  <Route>
    <Route>
      {routes}
    </Route>
    <Route>
      {basicRoutes}
    </Route>
  </Route>
);

export default (
    //<SocketProvider socket={SocketClient.socket}>
        <Provider store = {websiteStore} >
          <Route>

            <Route path='/ltr'>
              {combinedRoutes}
            </Route>
            <Route path='/rtl'>
              {combinedRoutes}
            </Route>

          </Route>
        </Provider>
    //</SocketProvider>
);
