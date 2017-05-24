/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 5/24/2017.
 * (C) BIT TECHNOLOGIES
 */

import React from 'react';
import {connect} from "react-redux";
import classNames from 'classnames';
import { Link, withRouter } from 'react-router';

import axios from 'axios';

import {getPath} from 'common/common-functions';
import { AuthService } from 'modules/services/REST/authentication/auth.service';

import Select from 'react-select';

import CountrySelect from "react-country-select";

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
    HelpBlock,
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
export class ViewForum extends React.Component {

    constructor(props){
        super(props);

        this.AuthService = new AuthService(props.dispatch);

    }

    render() {

        var onSuccess = this.props.onSuccess || function (){};
        var onSwitch = this.props.onSwitch || function (){};

        return (
            <PanelContainer controls={false} style={{marginBottom:0}}>

                <Panel>
                    <PanelBody style={{padding: 0}}>
                        <div className='text-center bg-darkblue fg-white'>
                            <h3 style={{margin: 0, padding: 20}}> <strong>Sign up</strong> to SkyHub </h3>
                        </div>
                        <div>
                            <div style={{padding: 25, paddingTop: 0, paddingBottom: 0, margin: 'auto', marginBottom: 25, marginTop: 25}}>


                                <Form onSubmit={::this.handleCheckRegister}>

                                    <Row>

                                        <Col xs={6} collapseLeft collapseRight >
                                            <FormGroup controlId='userNameInput' validationState={this.state.userNameValidationStatus[0]}>
                                                <InputGroup style={{marginRight: 10}}>
                                                    <InputGroup.Addon>
                                                        <Icon glyph='icon-fontello-user' />
                                                    </InputGroup.Addon>
                                                    <FormControl autoFocus type='text' className='border-focus-blue' placeholder='username' value={this.state.userName} onChange={::this.handleUserNameChange} />
                                                    <FormControl.Feedback />
                                                </InputGroup>
                                                <HelpBlock>{this.state.userNameValidationStatus[1]}</HelpBlock>
                                            </FormGroup>
                                        </Col>

                                        <Col xs={6} collapseLeft collapseRight >
                                            <FormGroup controlId='emailAddressInput' validationState={this.state.emailAddressValidationStatus[0]}>
                                                <InputGroup >
                                                    <InputGroup.Addon>
                                                        <Icon glyph='icon-fontello-mail' />
                                                    </InputGroup.Addon>
                                                    <FormControl type='email' className='border-focus-blue' placeholder='John@gmail.com' value={this.state.emailAddress} onChange={::this.handleEmailAddressChange} />
                                                    <FormControl.Feedback />
                                                </InputGroup>
                                                <HelpBlock>{this.state.emailAddressValidationStatus[1]}</HelpBlock>
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs={6} collapseLeft collapseRight >
                                            <FormGroup controlId='firstName' validationState={this.state.firstNameValidationStatus[0]}>
                                                <InputGroup  style={{marginRight: 10}}>
                                                    <InputGroup.Addon>
                                                        <Icon glyph='icon-fontello-font' />
                                                    </InputGroup.Addon>
                                                    <FormControl type='text' className='border-focus-blue' placeholder='First Name'  value={this.state.firstName} onChange={::this.handleFirstNameChange} />
                                                    <FormControl.Feedback />
                                                </InputGroup>
                                                <HelpBlock>{this.state.firstNameValidationStatus[1]}</HelpBlock>
                                            </FormGroup>
                                        </Col>
                                        <Col xs={6} collapseLeft collapseRight >
                                            <FormGroup controlId='lastName' validationState={this.state.lastNameValidationStatus[0]}>
                                                <InputGroup >
                                                    <InputGroup.Addon>
                                                        <Icon glyph='icon-fontello-bold' />
                                                    </InputGroup.Addon>
                                                    <FormControl type='text' className='border-focus-blue' placeholder='Last Name'  value={this.state.lastName} onChange={::this.handleLastNameChange} />
                                                    <FormControl.Feedback />
                                                </InputGroup>
                                                <HelpBlock>{this.state.lastNameValidationStatus[1]}</HelpBlock>
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs={6} collapseLeft collapseRight >
                                            <FormGroup controlId='password' validationState={this.state.passwordValidationStatus[0]}>
                                                <InputGroup  style={{marginRight: 10}}>
                                                    <InputGroup.Addon>
                                                        <Icon glyph='icon-fontello-key' />
                                                    </InputGroup.Addon>
                                                    <FormControl type='password' className='border-focus-blue' placeholder='password'  value={this.state.password} onChange={::this.handlePasswordChange} />
                                                    <FormControl.Feedback />
                                                </InputGroup>
                                                <HelpBlock>{this.state.passwordValidationStatus[1]}</HelpBlock>
                                            </FormGroup>
                                        </Col>
                                        <Col xs={6} collapseLeft collapseRight >
                                            <FormGroup controlId='retypepassword' validationState={this.state.retypePasswordValidationStatus[0]}>
                                                <InputGroup >
                                                    <InputGroup.Addon>
                                                        <Icon glyph='icon-fontello-key' />
                                                    </InputGroup.Addon>
                                                    <FormControl type='password' className='border-focus-blue' placeholder='password'  value={this.state.retypePassword} onChange={::this.handleRetypePasswordChange} />
                                                    <FormControl.Feedback />
                                                </InputGroup>
                                                <HelpBlock>{this.state.retypePasswordValidationStatus[1]}</HelpBlock>
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs={6} collapseLeft collapseRight >
                                            <FormGroup controlId='country' validationState={this.state.countryValidationStatus[0]}>
                                                <InputGroup style={{marginRight: 10}}>
                                                    <InputGroup.Addon>
                                                        <Icon glyph='icon-fontello-flag-1' />
                                                    </InputGroup.Addon>

                                                    <CountrySelect controlId="countrySelect" multi={false} flagImagePath="/../../imgs/app/flags/flags/flat/flagicons/"  ref={(input) => this.countryInput = input}  value={this.state.countryCode}  onSelect={this.handleCountrySelect} />
                                                    <FormControl.Feedback />
                                                </InputGroup>
                                                <HelpBlock>{this.state.countryValidationStatus[1]}</HelpBlock>
                                            </FormGroup>
                                        </Col>
                                        <Col xs={6} collapseLeft collapseRight >
                                            <FormGroup controlId='city' validationState={this.state.cityValidationStatus[0]}>
                                                <InputGroup >
                                                    <InputGroup.Addon>
                                                        <Icon glyph='icon-fontello-home-1' />
                                                    </InputGroup.Addon>
                                                    <FormControl type='city' className='border-focus-blue' placeholder='city'  value={this.state.city} onChange={::this.handleCityChange} />
                                                    <FormControl.Feedback />
                                                </InputGroup>
                                                <HelpBlock>{this.state.cityValidationStatus[1]}</HelpBlock>
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <FormGroup>
                                        <Grid>
                                            <Row>
                                                <Col xs={6} collapseLeft collapseRight style={{paddingTop: 10}}>

                                                    <div>
                                                        <Link to={getPath(this,'login')} onClick = {onSwitch.bind(this)}> <strong> Login </strong></Link>to SkyHub
                                                    </div>

                                                </Col>
                                                <Col xs={6} collapseLeft collapseRight className='text-right'>
                                                    <Button lg type='submit' bsStyle='primary' onClick={::this.handleCheckRegister}>Register</Button>
                                                </Col>
                                            </Row>
                                        </Grid>
                                    </FormGroup>
                                </Form>
                            </div>

                            <OauthSocialNetworkComponent/>

                        </div>
                    </PanelBody>
                </Panel>
            </PanelContainer>
        );
    }
}
