import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../../_firebase/';
import * as ROUTES from '../../constants/routeConstants';
import Alert from '../../components/Alert';

const SignIn = () => (
    <div>
        <SignInForm />
    </div>
);

const INITIAL_STATE = {
    email: '',
    password: '',
};

class SignInFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...INITIAL_STATE,
            isAlertOpen: false,
            alertMessage: '',
            severity: '',
        };
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
                this.setState({
                    alertMessage: error.message,
                    severity: 'error',
                });
            });
        this.setState({ isAlertOpen: true });
        event.preventDefault();
    };

    setLocalStorage = () => {};

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleAlertClose = () => {
        this.setState({ isAlertOpen: false });
    };

    componentDidMount() {
        this.googleSDK();
    }

    prepareLoginButton = () => {
        this.auth2.attachClickHandler(
            this.refs.googleLoginBtn,
            {},
            googleUser => {
                let profile = googleUser.getBasicProfile();
                console.log(
                    'Token || ' + googleUser.getAuthResponse().id_token
                );
                this.props.history.push(ROUTES.LANDING);
            },
            error => {
                this.setState({
                    alertMessage: error.message,
                    severity: 'error',
                });
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
        const {
            email,
            password,
            isAlertOpen,
            alertMessage,
            severity,
        } = this.state;
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
                <Alert
                    open={isAlertOpen}
                    handleClose={this.handleAlertClose}
                    message={alertMessage}
                    severity={severity}
                    duration={5000}
                />
            </div>
        );
    }
}

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);

export default SignIn; //SignInPage
export { SignInForm };
