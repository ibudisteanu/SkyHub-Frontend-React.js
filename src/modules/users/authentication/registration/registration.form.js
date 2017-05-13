import React from 'react';
import {connect} from "react-redux";
import classNames from 'classnames';
import { Link, withRouter } from 'react-router';

import axios from 'axios';

import {getPath} from 'common/common-functions';
import { AuthService } from '../../../services/REST/authentication/auth.service';

import Select from 'react-select';

import CountrySelect from "react-country-select";

import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

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
export class RegistrationForm extends React.Component {

    constructor(props){
        super(props);

        this.AuthService = new AuthService(props.dispatch);

        this.state = {

            userName : '',
            emailAddress : '',
            password : '',
            retypePassword : '',
            city : '',
            country : '',
            countryCode : '',
            ip: '',

            latitude : 0, longitude : 0,

            userNameValidationStatus : [null, ''],
            emailAddressValidationStatus : [null, ''],
            firstNameValidationStatus : [null, ''],
            lastNameValidationStatus : [null, ''],
            passwordValidationStatus : [null,  ''],
            retypePasswordValidationStatus : [null,  ''],
            countryValidationStatus : [null,   ''],
            cityValidationStatus : [null,  ''],
        }

    }

    back(e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.router.goBack();
    }

    convertValidationErrorToString(error) {
        if (error === "notUnique") return "Already exists in the Database";
        else
            if (error === "notEmpty") return "It's empty"
    }

    handleCheckRegister(e){

        e.preventDefault(); e.stopPropagation();

        var onSuccess = this.props.onSuccess || function (){};
        var onError = this.props.onError || function (){};

        console.log(this.state.userName, this.state.emailAddress, this.state.firstName, this.state.lastName, this.state.password, this.state.retypePassword, this.state.latitude, this.state.longitude, this.state.city, this.state.country, this.state.ip);

        var userNameValidationStatus = [null, ''],  emailAddressValidationStatus = [null, ''],  firstNameValidationStatus = [null, ''], lastNameValidationStatus = [null, ''], passwordValidationStatus = [null,  ''],
            retypePasswordValidationStatus = [null,  ''], countryValidationStatus = [null,  ''],  cityValidationStatus = [null,  ''];

        var bValidationError = false;

        if (this.state.password.length < 4){
            passwordValidationStatus = ["error","To weak. At least 4 characters"];
            bValidationError = true;
        }

        if ((this.state.password !== this.state.retypePassword)&&(this.state.password !== '')){
            retypePasswordValidationStatus = ["error","The passwords don't match"];
            bValidationError = true;
        }

        this.setState({
            userNameValidationStatus : userNameValidationStatus, emailAddressValidationStatus : emailAddressValidationStatus,
            firstNameValidationStatus : firstNameValidationStatus, lastNameValidationStatus : lastNameValidationStatus,
            passwordValidationStatus : passwordValidationStatus, retypePasswordValidationStatus : retypePasswordValidationStatus,
            countryValidationStatus : countryValidationStatus, cityValidationStatus : cityValidationStatus,
        });


        if (!bValidationError)
        this.AuthService.registerAsync(this.state.userName, this.state.emailAddress, this.state.password, this.state.firstName, this.state.lastName, this.state.countryCode, this.state.city, this.state.latitude, this.state.longitude).then( (res) =>{

            console.log(res);

            if (res.result === "true") onSuccess(res);
            else
            if (res.result === "false"){

                if (Object.keys(res.errors.username).length !== 0 ) this.setState({userNameValidationStatus : ["error", this.convertValidationErrorToString(res.errors.username[0])]});
                if (Object.keys(res.errors.email).length !== 0)this.setState({emailAddressValidationStatus : ["error", this.convertValidationErrorToString(res.errors.email[0])]});
                if (Object.keys(res.errors.firstName).length !== 0) this.setState({firstNameValidationStatus : ["error", this.convertValidationErrorToString(res.errors.firstName[0])]});
                if (Object.keys(res.errors.lastName).length  !== 0) this.setState({lastNameValidationStatus : ["error", this.convertValidationErrorToString(res.errors.lastName[0])]});
                if (Object.keys(res.errors.country).length  !== 0) this.setState({countryValidationStatus : ["error", this.convertValidationErrorToString(res.errors.country[0])]});
                if (Object.keys(res.errors.city).length  !== 0) this.setState({cityValidationStatus : ["error", this.convertValidationErrorToString(res.errors.city[0])]});

                onError(res);
            }

        });

    }

    componentDidMount() {

        axios.get("http://freegeoip.net/json/") .then(res => {

                res = res.data;

                this.setState({
                    country: res.country_name,
                    countryCode : res.country_code,
                    city : res.city,
                    latitude : res.latitude,
                    longitude : res.longitude,
                    ip : res.ip,
                });

                console.log(res);
            });
    }

    handleUserNameChange(e){
        this.setState({
            userName : e.target.value,
            userNameValidationStatus  : [null, '']
        });
    }

    handleEmailAddressChange(e){
        this.setState({
            emailAddress : e.target.value,
            emailAddressValidationStatus  : [null, '']
        });
    }

    handleFirstNameChange(e){
        this.setState({
            firstName : e.target.value,
            firstNameValidationStatus  : [null, '']
        });
    }

    handleLastNameChange(e){
        this.setState({
            lastName : e.target.value,
            lastNameValidationStatus  : [null, '']
        });
    }

    handlePasswordChange(e){
        this.setState({
            password : e.target.value,
            passwordValidationStatus  : [null, '']
        });
    }

    handleRetypePasswordChange(e){
        this.setState({
            retypePassword : e.target.value,
            retypePasswordValidationStatus  : [null, '']
        });
    }

    handleCountrySelect(val){
        this.setState({
            country : val.label,
            countryCode : val.value,

            countryValidationStatus  : [null, '']
        });

        console.log("values selected are:", val);
    }

    handleCityChange(e){
        this.setState({
            city : e.target.value,
            cityValidationStatus  : null, cityValidationStatusText : ''
        });
    }

    responseFacebook(response) {
        console.log(response);
    }

    responseGoogle (response){
       console.log(response);
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


                                <Form onSubmit={::this.handleCheckRegister}>

                                    <Row>

                                        <Col xs={6} collapseLeft collapseRight >
                                            <FormGroup controlId='userNameInput' validationState={this.state.userNameValidationStatus[0]}>
                                                <InputGroup bsSize='large' style={{marginRight: 10}}>
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
                                                <InputGroup bsSize='large'>
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
                                                <InputGroup bsSize='large' style={{marginRight: 10}}>
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
                                                <InputGroup bsSize='large'>
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
                                                <InputGroup bsSize='large' style={{marginRight: 10}}>
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
                                                <InputGroup bsSize='large'>
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
                                                <InputGroup bsSize='large' style={{marginRight: 10}}>
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
                                                <InputGroup bsSize='large'>
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

                                                    <div style={{marginTop: 25}}>
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
                            <div className='bg-hoverblue fg-black50 text-center' style={{padding: 25, paddingTop: 12.5}}>
                                <div style={{marginBottom: 12.5}}>SIGN UP WITH</div>
                                <Grid>
                                    <div style={{marginTop: 12.5, marginBottom: 12.5}}>

                                        <FacebookLogin
                                            appId="622709767918813"
                                            autoLoad={true}
                                            fields="id,name,email,picture,cover,first_name,last_name,age_range,link,gender,locale,timezone,updated_time,verified"
                                            scope="public_profile,user_friends"
                                            icon="icon-fontello-facebook"
                                            textButton=""
                                            callback={this.responseFacebook}
                                            cssClass="btn-darkblue btn-lg btn-default btn-social-network"
                                        />

                                        <GoogleLogin
                                            clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                                            buttonText="Login"
                                            onSuccess={responseGoogle}
                                            onFailure={responseGoogle}
                                        />,


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
