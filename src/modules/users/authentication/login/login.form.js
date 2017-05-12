import React from 'react';
import {connect} from "react-redux";
import classNames from 'classnames';
import { Link, withRouter } from 'react-router';

import {getPath} from 'common/common-functions';
import { AuthService } from '../../../services/REST/authentication/auth.service';

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
export class LoginForm extends React.Component {

    password = null;
    userEmail = null;

    userEmailValidatedStatus = null;
    passwordValidatedStatus = null;

    constructor(props) {
        super(props);

        this.AuthService = new AuthService(props.dispatch);

         this.state = {
             userEmailValidatedStatus : null,
             passwordValidatedStatus : null,
         }
    }

    back(e) {
        e.preventDefault(); e.stopPropagation();

        this.props.router.goBack();
    }

    componentDidMount() {
        $('html').addClass('authentication');
    }

    componentWillUnmount() {
        $('html').removeClass('authentication');
    }

    handleCheckLogin(e){

        e.preventDefault(); e.stopPropagation();

        console.log(this);
        console.log(this.password.value);
        console.log(this.userEmail.value);

        this.AuthService.loginAsync(this.userEmail.value, this.password.value).then( (res) =>{

            var userEmailValidatedStatus = null; var passwordValidatedStatus = null;

            console.log("Answer from server", res);

            if (res.result === "false"){
                if (res.message === "No User Found") {
                    userEmailValidatedStatus = "error";
                    passwordValidatedStatus = "error";
                }
                if (res.message === "Password Incorrect") passwordValidatedStatus = "error";
            }

            this.setState({
                userEmailValidatedStatus : userEmailValidatedStatus,
                passwordValidatedStatus : passwordValidatedStatus,
            });

        });
    }

    render() {

        var onSuccess = this.props.onSuccess || function (){};
        var onSwitch = this.props.onSwitch || function (){};

        return (
            <PanelContainer controls={false} >

                <Panel>
                    <PanelBody style={{padding: 0}}>
                        <div className='text-center bg-darkblue fg-white'>
                            <h3 style={{margin: 0, padding: 25}}> <strong>Login </strong>to SkyHub</h3>
                        </div>

                        <div>
                            <div className='text-center' style={{padding: 12.5}}>
                                or use your SkyHub account
                            </div>
                            <div style={{padding: 25, paddingTop: 0, paddingBottom: 0, margin: 'auto', marginBottom: 25, marginTop: 25}}>
                                <Form onSubmit={::this.handleCheckLogin}>
                                    <FormGroup controlId='emailaddress' validationState={this.state.userEmailValidatedStatus} >
                                        <InputGroup bsSize='large'>
                                            <InputGroup.Addon>
                                                <Icon glyph='icon-fontello-mail' />
                                            </InputGroup.Addon>
                                            <FormControl autoFocus type='text' className='border-focus-blue' placeholder='username   or    email'  inputRef={(input) => this.userEmail = input} defaultValue={''} />
                                            <FormControl.Feedback />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup controlId='password' validationState={this.state.passwordValidatedStatus}>
                                        <InputGroup bsSize='large'>
                                            <InputGroup.Addon>
                                                <Icon glyph='icon-fontello-key' />
                                            </InputGroup.Addon>
                                            <FormControl type='password' className='border-focus-blue' placeholder='password' inputRef={(input) => this.password = input} defaultValue={''}/>
                                            <FormControl.Feedback />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <Grid>
                                            <Row>
                                                <Col xs={6} collapseLeft collapseRight style={{paddingTop: 10}}>

                                                    <div style={{marginTop: 25}}>
                                                        <Link to={getPath(this,'register')} onClick = {onSwitch.bind(this)}> <strong> Register </strong></Link>to SkyHub
                                                    </div>

                                                </Col>
                                                <Col xs={6} collapseLeft collapseRight className='text-right'>
                                                    <Button lg type='submit' bsStyle='primary' onClick={::this.handleCheckLogin}>Login</Button>
                                                </Col>
                                            </Row>
                                        </Grid>
                                    </FormGroup>
                                </Form>
                            </div>

                            <div className='bg-hoverblue fg-black50 text-center' style={{padding: 12.5}}>
                                <div>You need to sign in for those awesome features</div>
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

                            </div>

                        </div>
                    </PanelBody>
                </Panel>
            </PanelContainer>
        );
    }
}
