import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

export default class Login extends Component {
    state = {
        redirect: false,
    };

    setRedirect = () => {
        this.setState({
            redirect: true,
        });
        this.renderRedirect();
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to="/" />;
        }
    };

    componentDidMount() {
        this.googleSDK();
        console.log('sfsfd');
    }

    prepareLoginButton = () => {
        console.log(this.refs.googleLoginBtn);

        this.auth2.attachClickHandler(
            this.refs.googleLoginBtn,
            {},
            googleUser => {
                let profile = googleUser.getBasicProfile();
                console.log(
                    'Token || ' + googleUser.getAuthResponse().id_token
                );
                console.log('ID: ' + profile.getId());
                console.log('Name: ' + profile.getName());
                console.log('Image URL: ' + profile.getImageUrl());
                console.log('Email: ' + profile.getEmail());
                //YOUR CODE HERE
            },
            error => {
                alert(JSON.stringify(error, undefined, 2));
            }
        );
    };

    googleSDK = () => {
        window['googleSDKLoaded'] = () => {
            window['gapi'].load('auth2', () => {
                this.auth2 = window['gapi'].auth2.init({
                    client_id:
                        '537770731016-gf1gbn5aqficurhnnaijpivgcg25o140.apps.googleusercontent.com',
                    cookiepolicy: 'single_host_origin',
                    scope: 'email',
                });
                this.prepareLoginButton();
            });
        };

        (function (d, s, id) {
            var js,
                fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src =
                'https://apis.google.com/js/platform.js?onload=googleSDKLoaded';
            fjs.parentNode.insertBefore(js, fjs);
        })(document, 'script', 'google-jssdk');
    };

    render() {
        return (
            <div>
                <div className="divLogin">
                    <form className="formLogin">
                        <div className="mainTitle">
                            <h1>PSYCHOGRAM</h1>
                        </div>
                        <h3>Sign In</h3>
                        <div className="form-group">
                            <label>Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter email"
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter password"
                            />
                        </div>
                        <br></br>
                        <div className="form-group">
                            {this.renderRedirect()}
                            <button
                                onClick={this.setRedirect}
                                type="submit"
                                className="btn btn-primary btn-block"
                            >
                                Submit
                            </button>
                        </div>
                        <p id="noacc text-left">
                            Don't have an acount?
                            <Link
                                id="noaccLink"
                                className="nav-link"
                                to={'/sign-up'}
                            >
                                Sign up
                            </Link>
                        </p>
                    </form>
                    <div className="formGoogle">
                        <button
                            className="loginBtn loginBtn--google"
                            ref="googleLoginBtn"
                        >
                            Login with Google
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
