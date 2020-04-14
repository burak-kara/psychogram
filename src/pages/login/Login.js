import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
//import { SignUpLink } from '../signup/SignUp';
import { withFirebase } from '../../constants/firebase/';
import * as ROUTES from '../../constants/routes';

//const SignInPage = () => (
const SignIn = () => (
    <div>
        <SignInForm />
    </div>
);

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class SignInFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { email, password } = this.state;
        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)

            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.LANDING);
            })
            .catch(error => {
                this.setState({ error });
            });
        event.preventDefault();
    };
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
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
                this.props.history.push(ROUTES.LANDING);
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
        const { email, password, error } = this.state;
        const isInvalid = password === '' || email === '';

        return (
            <div>
                <div className="divLogin">
                    <form className="formLogin" onSubmit={this.onSubmit}>
                        <div className="mainTitle">
                            <h1>PSYCHOGRAM</h1>
                        </div>
                        <h3>Sign in</h3>
                        <br />
                        <div className="form-group">
                            <label id="labId">
                                {' '}
                                <strong>Email address</strong>
                            </label>
                            <br />
                            <input
                                name="email"
                                value={email}
                                onChange={this.onChange}
                                type="text"
                                placeholder="Email Address"
                            />
                        </div>
                        <div className="form-group">
                            <label id="labId">
                                {' '}
                                <strong>Password</strong>
                            </label>
                            <br />
                            <input
                                name="password"
                                value={password}
                                onChange={this.onChange}
                                type="password"
                                placeholder="Password"
                            />
                        </div>
                        <br></br>
                        <div className="form-group">
                            <button
                                id="submitButton"
                                disabled={isInvalid}
                                type="submit"
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

                        {error && <p>{error.message}</p>}
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

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);

export default SignIn; //SignInPage
export { SignInForm };
