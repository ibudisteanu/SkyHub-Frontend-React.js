/**
 * Created by BIT TECHNOLOGIES on 5/28/2017.
 */

import React from 'react';

import {
    Row,
    Col,
    Icon,
    Grid,
    Panel,
    Image,
    Button,
    PanelBody,
    PanelHeader,
    PanelFooter,
    FormControl,
    PanelContainer,
} from '@sketchpixy/rubix';


export class HeaderCover extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            follow: 'follow me',
            followActive: false,
            likeCount: 999,
            likeActive: false,
            likeTextStyle: 'fg-white'
        };
    }
    handleFollow() {
        this.setState({
            follow: 'followed',
            followActive: true
        });
    }
    handleLike() {
        this.setState({
            likeCount: 1000,
            likeActive: true,
            likeTextStyle: 'fg-orange75'
        });
    }

    renderSocialMenu(){
        return (
            <Col xs={12} sm={4}>
                <div className='header-cover-avatar'>
                    <Image src='/imgs/app/avatars/avatar.jpg' height='100' width='100' style={{display: 'block', borderRadius: 100, border: '2px solid #fff', margin: 'auto', marginTop: 50}} />
                    <h4 className='fg-white text-center'>Anna Sanchez</h4>
                    <h5 className='fg-white text-center' style={{opacity: 0.8}}>DevOps Engineer, NY</h5>
                    <hr className='border-black75' style={{borderWidth: 2}}/>
                    <div className='text-center'>
                        <Button outlined inverse retainBackground active={this.state.followActive} bsStyle='brightblue' onClick={::this.handleFollow}>
                            <span>{this.state.follow}</span>
                        </Button>
                    </div>
                </div>
            </Col>
        );
    }

    renderDescriptionMenu(){
        return (
            <div>
                <Col xs={12} sm={8}>
                    <div className={'header-cover-description'} >
                        <div>
                            <Image src={this.props.icon||'http://skyhub.me/theme/images/SkyHub-logo.png'} />
                            <row>
                                <h1 className='fg-white'>{this.props.title}</h1>
                                <br/>
                                <h4 className='fg-white' style={{opacity: 0.8}}>{this.props.subTitle}</h4>
                            </row>

                            <div className="header-cover-toolbar" >
                                <div style={{display: 'inline-block'}}>

                                    {this.props.buttons}

                                    <Button id='likeCount' retainBackground rounded bsStyle='orange75' active={this.state.likeActive} onClick={::this.handleLike}>
                                        <Icon glyph='icon-fontello-heart-1' />
                                    </Button>
                                    <label className='header-cover-toolbar-label' htmlFor='likeCount'><span className={this.state.likeTextStyle}>{this.state.likeCount} likes</span></label>
                                </div>

                            </div>
                        </div>
                    </div>
                </Col>

                { 1== 2 ? ::this.renderSocialMenu : ''}

            </div>

        );
    }

    render() {
        return (
            <div className="header-cover" style={{backgroundImage: 'url('+this.props.coverPic+')', backgroundColor: this.props.coverColor||'darkblue'}}>

                {(this.props.showLayOver||false) == true ? <div className='header-cover-layover'> </div> : '' }
                
                {(this.props.showDescriptionMenu||true) == true ? this.renderDescriptionMenu() : 'NU AFISEZ NIMIC' }

            </div>

        )
    }
}