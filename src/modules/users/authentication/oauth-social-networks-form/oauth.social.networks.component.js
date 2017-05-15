/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 5/14/2017.
 * (C) BIT TECHNOLOGIES
 */

import React from 'react';
import {connect} from "react-redux";
import { Link, withRouter } from 'react-router';

import axios from 'axios';

import {getPath} from 'common/common-functions';
import { AuthService } from '../../../services/REST/authentication/auth.service';

import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

import {
    Icon,
    Grid,
    Button,
    Modal,
} from '@sketchpixy/rubix';

@withRouter
@connect(
    state => ({
        userAuthenticated : state.userAuthenticated,
    }),
    dispatch => ({dispatch}),
)
export class OauthSocialNetworkComponent extends React.Component {

    constructor(props){
        super(props);

        this.AuthService = new AuthService(props.dispatch);

        this.state = {

            city : '',
            country : '',
            countryCode : '',
            ip: '',

            latitude : 0, longitude : 0,
        }

    }

    back(e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.router.goBack();
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

    responseFacebook(response) {

        // accessToken:"EAAI2WeqD1N0BAH11ZBrtE66a2ZAF1BMoVPNBf9WVS6thiRjLqsWloXNswva5uZAp48iFmNARJFYkd6y4OzqhyU36vyjhp5idDjSfGoEoC6TfaK7VZCE63u34WFwoeaqPLQBmzVJWAWxdqVkJUVBZBW2JZAZB72IrhRw7jSvTJ86mBK1GeJstFR1lSXZBgqZCSAqQZD"
        // age_range: {min: 21}
        // cover: {id: "" , offset_y: 2, source: "location.jpg"}
        // expiresIn:6803
        // first_name:"Alexandru"
        // gender:"male"
        // id:"1899824400275208"
        // last_name : "Ionut"
        // link:"https://www.facebook.com/app_scoped_user_id/1899824400275208/"
        // locale:"en_US"
        // name:"Alexandru Ionut"
        // picture:{ data: { is_silhoette: false, url : "picture"}}
        // signedRequest: "ASS-ky4D-1KsC1Rbksly-QiCPN5sYQDYAK7xqLN_v9I.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImNvZGUiOiJBUUJ6VXFicHlvNU1CVnNSTHRJbWwzcnBFOGwyN2xURTk4Ny1XRWNzZHQyWlJkc1JxR2k4QVE3SDEzMjFwTFFrTzJaWm80LUEwcWRyZDM1dHU4UUtMb0JKa3k2eWpGMUFkLVVLb0Q0Q3piU3hVdm1xeGhHWjRuQ2pqSDY5NXpFLWJfT0dMdDM0Sll4ZHdCTlN0aHNSaGZVWHJESno5Z2NaTDhaQlZqb3NFdmRIRV90dVpFQ3VKODVEZk9MVTZvZ1BhVkVFSnpqdkxhQ0tuWjg2ckw3c0cwY2w1UVdFb04ydEtVdks2UXJZcGtTZE9BUXlhUlpGc3N0Z2FkVWl2ZzA0SmstWGY4X1hXSmhuWnlQaTk0bmJOUUVQdlZyc3h0SW5PWnY3NGw0QUIzTHBlLXVQakxQQ2p5OVhnRHVvbUgtTkZkTkNlZEtUYjZtVGp1U2ZvSmtONEZFWSIsImlzc3VlZF9hdCI6MTQ5NDc4NTE5NywidXNlcl9pZCI6IjE4OTk4MjQ0MDAyNzUyMDgifQ"
        // timezone:3
        // updated_time:"2017-04-09T16:31:48+0000"
        // userID: "1899824400275208"
        // verified : true

        var onSuccess = this.props.onSuccess || function (){};

        try{

            try {
                var sCoverImage = response.cover.source || '';
                var sProfilePic = response.profile || '';
            } catch (Exception)
            {
                console.log('Error extracting CoverImage and Profile Pic');
            }

            var sAccessToken = response.accessToken || '';
            var sEmail = response.email || '';
            var sFirstName = response.first_name || '';
            var sLastName = response.last_name || '';
            var sGender = response.gender || '';
            var sFacebookId = response.id || '';
            var iAge = response.age_range.min || 0;
            var iTimeZone = response.timezone || 0;
            var sLanguage = response.locale;
            var bVerified = response.verified;


            this.AuthService.registerOAuthAsync('facebook',sFacebookId,  sAccessToken, sEmail, sFirstName, sLastName, sProfilePic, sCoverImage,
                    this.state.countryCode, sLanguage, this.state.city, this.state.latitude, this.state.longitude, sGender, iAge, iTimeZone, bVerified)

                .then( (res) => {

                console.log("Auth Service answer ",res);

                if (res.result === "true") onSuccess(res);
                else if (res.result === "false")
                    vex.dialog.alert('Error registering with facebook ');

            });

        } catch (Exception)
        {
            console.log('error facebook registering');
        }

        console.log(response);

    }

    responseSuccessGoogle (response){
        console.log(response);
    }

    responseFailureGoogle (response){
        vex.dialog.alert('Error registering with Google');
    }

    render() {

        return (
                <div className='bg-hoverblue fg-black50 text-center' style={{padding: 10}}>
                    <strong>SIGN UP with</strong>
                    <Grid>
                        <div style={{marginTop: 12.5, marginBottom: 12.5}}>

                            <Grid>

                                    <FacebookLogin
                                        appId="622709767918813"
                                        autoLoad={true}
                                        fields="id,name,email,picture,cover,first_name,last_name,age_range,link,gender,locale,timezone,updated_time,verified"
                                        scope="public_profile,user_friends"
                                        icon="icon-fontello-facebook"
                                        textButton=""
                                        callback={::this.responseFacebook}
                                        cssClass="btn-darkblue btn-lg btn-default btn-social-network"
                                    />

                                    <GoogleLogin
                                        clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                                        buttonText=""
                                        autoLoad={false}
                                        className="btn-danger btn-lg btn-default btn-social-network"
                                        onSuccess={::this.responseSuccessGoogle}
                                        //onFailure={::this.responseFailureGoogle }
                                        fetchBasicProfile
                                    >
                                        <Icon glyph='icon-fontello-google' />
                                    </GoogleLogin>


                                    <Button id='twitter-btn' bsStyle='blue' type='submit' onClick={::this.back}>
                                        <Icon glyph='icon-fontello-twitter' />
                                    </Button>

                            </Grid>

                        </div>
                    </Grid>

                </div>

        );
    }
}