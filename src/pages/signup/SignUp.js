import { Link, withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import * as ROUTES from '../../constants/routeConstants';
import { withFirebase } from '../../_firebase';
import { compose } from 'recompose';
import Alert from '../../components/Alert';

const SignUp = () => (
    <div>
        <SignUpForm />
    </div>
);

const INITIAL_STATE = {
    username: '',
    phone: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    age: null,
};

class SignUpFormBase extends Component {
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
        const { username, email, passwordOne } = this.state;
        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(() => {
                return this.props.firebase.doSendEmailVerification();
            })
            .then(authUser => {
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

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleAlertClose = () => {
        this.setState({ isAlertOpen: false });
    };

    render() {
        const {
            username,
            phone,
            email,
            passwordOne,
            passwordTwo,
            age,
            isAlertOpen,
            alertMessage,
            severity,
        } = this.state;

        const isInvalid = age < 18 || username === '';

        return (
            <>
                <div className="divLogin">
                    <form className="formLogin" onSubmit={this.onSubmit}>
                        <h1>PSYCHOGRAM</h1>
                        <h3>Sign up</h3>
                        <br />
                        <div className="form-group">
                            <label id="labId">
                                {' '}
                                <strong>Full Name</strong>
                            </label>
                            <br />
                            <input
                                name="username"
                                value={username}
                                onChange={this.onChange}
                                type="text"
                                placeholder="Full Name"
                            />
                        </div>
                        <div className="form-group">
                            <label id="labId">
                                {' '}
                                <strong>Phone Number</strong>
                            </label>
                            <br />
                            <input
                                name="phone"
                                value={phone}
                                onChange={this.onChange}
                                type="text"
                                placeholder="Enter phone number"
                            />
                        </div>
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
                                name="passwordOne"
                                value={passwordOne}
                                onChange={this.onChange}
                                type="password"
                                placeholder="Password"
                            />
                        </div>
                        <div className="form-group">
                            <label id="labId">
                                {' '}
                                <strong>Password</strong>
                            </label>
                            <br />
                            <input
                                name="passwordTwo"
                                value={passwordTwo}
                                onChange={this.onChange}
                                type="password"
                                placeholder="Confirm Password"
                            />
                        </div>
                        <div className="form-group">
                            <label id="labId">
                                {' '}
                                <strong>Age</strong>
                            </label>
                            <br />
                            <input
                                name="age"
                                value={age}
                                onChange={this.onChange}
                                type="number"
                                placeholder="Only +18"
                            />
                        </div>
                        <div className="form-group">
                            <button
                                id="submitButton"
                                disabled={isInvalid}
                                type="submit"
                            >
                                Sign Up
                            </button>
                        </div>
                        <p id="noacc text-left">
                            Already registered?
                            <Link
                                id="noaccLink"
                                className="nav-link"
                                to={'/sign-in'}
                            >
                                Sign in
                            </Link>
                        </p>
                    </form>
                </div>
                <Alert
                    open={isAlertOpen}
                    handleClose={this.handleAlertClose}
                    message={alertMessage}
                    severity={severity}
                    duration={5000}
                />
            </>
        );
    }
}

const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
);

const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);

export default SignUp; //SignUpPage
export { SignUpForm, SignUpLink };
