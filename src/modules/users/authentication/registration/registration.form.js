import React from 'react';
import {connect} from "react-redux";
import classNames from 'classnames';
import { Link, withRouter } from 'react-router';

import {getPath} from 'common/common-functions';
import { SocketService } from '../../../services/REST/socket/socket.service';

import {
    Row,
    Col,
    Icon,
    Grid,
    Form,
    Panel,
    Button,
    PanelBody,
    FormGroup,
    InputGroup,
    FormControl,
    PanelContainer,
} from '@sketchpixy/rubix';

@withRouter
@connect(
    state => ({
        userAuthenticated : state.userAuthenticated,
    }),
    dispatch => ({dispatch}),
)
export class RegistrationForm extends React.Component {

    constructor(props){
        super(props);

        this.SocketService = new SocketService(props.dispatch);
    }

    back(e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.router.goBack();
    }

    componentDidMount() {
        $('html').addClass('authentication');
    }

    componentWillUnmount() {
        $('html').removeClass('authentication');
    }

    render() {

        var onSuccess = this.props.onSuccess || function (){};
        var onSwitch = this.props.onSwitch || function (){};

        return (
            <PanelContainer controls={false}>

                <Panel>
                    <PanelBody style={{padding: 0}}>
                        <div className='text-center bg-darkblue fg-white'>
                            <h3 style={{margin: 0, padding: 25}}> <strong>Sign up</strong> to SkyHub </h3>
                        </div>
                        <div>
                            <div style={{padding: 25, paddingTop: 0, paddingBottom: 0, margin: 'auto', marginBottom: 25, marginTop: 25}}>
                                <Form onSubmit={::this.back}>
                                    <FormGroup controlId='username'>
                                        <InputGroup bsSize='large'>
                                            <InputGroup.Addon>
                                                <Icon glyph='icon-fontello-user' />
                                            </InputGroup.Addon>
                                            <FormControl autoFocus type='text' className='border-focus-blue' placeholder='Username' />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup controlId='emailaddress'>
                                        <InputGroup bsSize='large'>
                                            <InputGroup.Addon>
                                                <Icon glyph='icon-fontello-mail' />
                                            </InputGroup.Addon>
                                            <FormControl type='email' className='border-focus-blue' placeholder='support@sketchpixy.com' />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup controlId='password'>
                                        <InputGroup bsSize='large'>
                                            <InputGroup.Addon>
                                                <Icon glyph='icon-fontello-key' />
                                            </InputGroup.Addon>
                                            <FormControl type='password' className='border-focus-blue' placeholder='password' />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <Grid>
                                            <Row>
                                                <Col xs={6} collapseLeft collapseRight style={{paddingTop: 10}}>

                                                    <div style={{marginTop: 25}}>
                                                        <Link to={getPath(this,'login')} onClick = {onSwitch.bind(this)}> <strong> Login </strong></Link>to SkyHub
                                                    </div>

                                                </Col>
                                                <Col xs={6} collapseLeft collapseRight className='text-right'>
                                                    <Button lg type='submit' bsStyle='primary' onClick={::this.back}>Register</Button>
                                                </Col>
                                            </Row>
                                        </Grid>
                                    </FormGroup>
                                </Form>
                            </div>
                            <div className='bg-hoverblue fg-black50 text-center' style={{padding: 25, paddingTop: 12.5}}>
                                <div style={{marginBottom: 12.5}}>SIGN UP WITH</div>
                                <Grid>
                                    <div style={{marginTop: 12.5, marginBottom: 12.5}}>
                                        <Button id='facebook-btn' bsStyle='darkblue' type='submit' onClick={::this.back}>
                                            <Icon glyph='icon-fontello-facebook' />
                                        </Button>
                                        <Button id='google-btn' bsStyle='danger' type='submit' onClick={::this.back}>
                                            <Icon glyph='icon-fontello-google' />
                                        </Button>
                                        <Button id='twitter-btn' bsStyle='blue' type='submit' onClick={::this.back}>
                                            <Icon glyph='icon-fontello-twitter' />
                                        </Button>
                                    </div>
                                </Grid>

                            </div>
                        </div>
                    </PanelBody>
                </Panel>
            </PanelContainer>
        );
    }
}
