import { Link, withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../../constants/firebase';
import { compose } from 'recompose';

//const SignUpPage = () => (
const SignUp = () => (
    <div>
        <SignUpForm />
    </div>
);

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    age: null,
    error: null,
};

class SignUpFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
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
                this.setState({ error });
            });
        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            age,
            error,
        } = this.state;

        /*
              const isInvalid =
                  passwordOne !== passwordTwo ||
                  passwordOne === '' ||
                  email === '' ||
                  age < 18 ||
                  username === '';
      */
        const isInvalid = age < 18 || username === '';

        return (
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

                    {error && <p>{error.message}</p>}
                </form>
            </div>
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
