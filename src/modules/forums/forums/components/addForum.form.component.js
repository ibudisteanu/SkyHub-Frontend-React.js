/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 5/16/2017.
 * (C) BIT TECHNOLOGIES
 */

/**
 * Created by Alexandru Ionut Budisteanu - SkyHub
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
    PanelHeader,
    PanelFooter,
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
export class AddForumForm extends React.Component {

    constructor(props){
        super(props);

        this.AuthService = new AuthService(props.dispatch);

        this.state = {

            title : '',
            description : '',
            keywords : [],
            countryCode : '', country : '',
            city : '',
            language : '',
            latitude : 0, longitude : 0,

            titleValidationStatus : [null, ''],
            descriptionValidationStatus : [null, ''],
            keywordsValidationStatus : [null, ''],
            countryValidationStatus : [null, ''],
            cityValidationStatus : [null, ''],
            languageValidationStatus : [null, ''],
        }

    }

    convertValidationErrorToString(error) {
        if (error === "notUnique") return "Already exists in the Database";
        else
        if (error === "notEmpty") return "It's empty"
    }

    handleAddForum(e){

        e.preventDefault(); e.stopPropagation();

        var onSuccess = this.props.onSuccess || function (){};
        var onError = this.props.onError || function (){};

        /*
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
         this.AuthService.registerAsync(this.state.userName, this.state.emailAddress, this.state.password, this.state.firstName, this.state.lastName, this.state.countryCode, '', this.state.city, this.state.latitude, this.state.longitude, this.state.timeZone)

         .then( (res) =>{

         console.log(res);

         if (res.result === "true") onSuccess(res);
         else
         if (res.result === "false"){

         if ((typeof res.errors.username !=="undefined")&&(Object.keys(res.errors.username).length !== 0 )) this.setState({userNameValidationStatus : ["error", this.convertValidationErrorToString(res.errors.username[0])]});
         if ((typeof res.errors.email !=="undefined")&&(Object.keys(res.errors.email).length !== 0)) this.setState({emailAddressValidationStatus : ["error", this.convertValidationErrorToString(res.errors.email[0])]});
         if ((typeof res.errors.firstName !=="undefined")&&(Object.keys(res.errors.firstName).length !== 0)) this.setState({firstNameValidationStatus : ["error", this.convertValidationErrorToString(res.errors.firstName[0])]});
         if ((typeof res.errors.lastName !=="undefined")&&(Object.keys(res.errors.lastName).length  !== 0)) this.setState({lastNameValidationStatus : ["error", this.convertValidationErrorToString(res.errors.lastName[0])]});
         if ((typeof res.errors.country !=="undefined")&&(Object.keys(res.errors.country).length  !== 0)) this.setState({countryValidationStatus : ["error", this.convertValidationErrorToString(res.errors.country[0])]});
         if ((typeof res.errors.city !=="undefined")&&(Object.keys(res.errors.city).length  !== 0)) this.setState({cityValidationStatus : ["error", this.convertValidationErrorToString(res.errors.city[0])]});

         onError(res);
         }

         });

         */
    }

    componentDidMount() {

        axios.get("http://freegeoip.net/json/") .then(res => {

            res = res.data;

            this.setState({
                country: res.country_name||'',
                countryCode : res.country_code||'',
                city : res.city||'',
                latitude : res.latitude||'',
                longitude : res.longitude||'',
                ip : res.ip||'',
                timeZone: res.time_zone||'',
            });

            console.log(res);
        });
    }

    handleTitleChange(e){
        this.setState({
            title : e.target.value,
            titleValidationStatus  : [null, '']
        });
    }

    handleDescriptionChange(e){
        this.setState({
            description : e.target.value,
            descriptionValidationStatus  : [null, '']
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

    render() {

        var onSuccess = this.props.onSuccess || function (){};
        var onSwitch = this.props.onSwitch || function (){};

        return (
            <PanelContainer controls={false} style={{marginBottom:20, marginTop:20}}>

                <Panel>

                    <PanelHeader className='bg-blue' style={{textAlign: "center"}}>
                        <Grid>
                            <Row>
                                <Col xs={12} className='fg-white'>
                                    <h3>Create a <strong>Forum</strong></h3>
                                </Col>
                            </Row>
                        </Grid>
                    </PanelHeader>

                    <PanelBody style={{padding: 0}}>

                        <div style={{padding: 25, paddingTop: 0, paddingBottom: 0, margin: 'auto', marginBottom: 25, marginTop: 25}}>


                            <Form onSubmit={::this.handleAddForum}>

                                <Row>
                                    <FormGroup controlId='titleInput' validationState={this.state.titleValidationStatus[0]}>
                                        <InputGroup>
                                            <InputGroup.Addon>
                                                <Icon glyph='icon-fontello-pen' />
                                            </InputGroup.Addon>
                                            <FormControl autoFocus type='text' className='border-focus-blue' placeholder='title' value={this.state.title} onChange={::this.handleTitleChange} />
                                            <FormControl.Feedback />
                                        </InputGroup>
                                        <HelpBlock>{this.state.titleValidationStatus[1]}</HelpBlock>
                                    </FormGroup>

                                </Row>

                                <Row>
                                    <FormGroup controlId='descriptionInput' validationState={this.state.descriptionValidationStatus[0]}>
                                        <InputGroup >
                                            <InputGroup.Addon>
                                                <Icon glyph='icon-fontello-mail' />
                                            </InputGroup.Addon>
                                            <FormControl type='text'  componentClass='textarea' rows='3' className='border-focus-blue' placeholder='description' value={this.state.description} onChange={::this.handleDescriptionChange} />
                                            <FormControl.Feedback />
                                        </InputGroup>
                                        <HelpBlock>{this.state.descriptionValidationStatus[1]}</HelpBlock>
                                    </FormGroup>

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


                            </Form>
                        </div>
                    </PanelBody>

                    <PanelFooter className='bg-lightblue'>

                        <Grid>
                            <Row>
                                <Col className='text-right' style={{paddingTop:20, paddingBottom:20, paddingRight:20}}>
                                    <Button lg type='submit' bsStyle='primary' onClick={::this.handleAddForum}>Create Forum</Button>
                                </Col>
                            </Row>
                        </Grid>

                    </PanelFooter>

                </Panel>
            </PanelContainer>
        );
    }
}
