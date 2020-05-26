import { Link, withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import * as ROUTES from '../../../_constants/routeConstants';
import * as ROLES from '../../../_constants/roles';
import { withFirebase } from '../../../_firebase';
import { compose } from 'recompose';
import Alert from '../../Alert';
import TextField from '@material-ui/core/TextField';
import * as moment from 'moment';
import { passCheck } from '../../../_utility/functions';

const SignUp = () => (
    <div>
        <SignUpForm />
    </div>
);

var passObj = {
    policy: '',
    passwd: '',
};

const INITIAL_STATE = {
    username: '',
    name: '',
    surname: '',
    phone: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    birthday: '',
    description: '',
    isDoctor: false,
    profilePictureSource:
        'https://firebasestorage.googleapis.com/v0/b/psycholog-8ba2d.appspot.com/o/profile_pics%2Fprofile_pic.jpg?alt=media&token=52289729-0bf6-4888-a619-585ca537dd31',
    location: '',
    role: '',
    status: 'Grinning Face',
};

class SignUpFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...INITIAL_STATE,
            isAlertOpen: false,
            alertMessage: '',
            severity: '',
            policy: {
                min: '',
                max: '',
                hasNumber: '',
                hasMixChar: '',
                hasSpecial: '',
            },
        };
    }

    componentDidMount() {
        this.props.firebase.policy().on('value', snapshot => {
            this.setState({ policy: snapshot.val() });
        });
    }

    onSubmit = event => {
        const {
            username,
            name,
            surname,
            email,
            passwordOne,
            phone,
            birthday,
            description,
            profilePictureSource,
            location,
            isDoctor,
        } = this.state;

        passObj.policy = this.state.policy;
        passObj.passwd = this.state.passwordOne;
        const checkResult = passCheck(passObj);

        if (checkResult.err === false) {
            this.props.firebase
                .doCreateUserWithEmailAndPassword(email, passwordOne)
                .then(authUser => {
                    return this.props.firebase.user(authUser.user.uid).set({
                        username,
                        name,
                        surname,
                        email,
                        phone,
                        role: isDoctor ? ROLES.DOCTOR : ROLES.PATIENT,
                        birthday,
                        description,
                        profilePictureSource,
                        location,
                    });
                })
                .then(() => {
                    // TODO implement with styling
                    // return this.props.firebase.doSendEmailVerification();
                })
                .then(() => {
                    this.setState({ ...INITIAL_STATE });
                    this.setState({
                        alertMessage: 'Başarıyla Kaydedildi',
                        severity: 'success',
                        isAlertOpen: true,
                    });
                    this.props.history.push(ROUTES.LANDING);
                })
                .catch(error => {
                    this.setState({
                        alertMessage: error.message,
                        severity: 'error',
                        isAlertOpen: true,
                    });
                });
            event.preventDefault();
        } else {
            this.setState({
                alertMessage: checkResult.mess,
                severity: 'error',
                isAlertOpen: true,
            });
            event.preventDefault();
        }
    };

    onChange = event => {
        const name = event.target.name;
        const value =
            name === 'isDoctor' ? event.target.checked : event.target.value;
        this.setState({ [name]: value });
    };

    handleAlertClose = () => {
        this.setState({ isAlertOpen: false });
    };

    render() {
        const {
            username,
            name,
            surname,
            phone,
            email,
            passwordOne,
            passwordTwo,
            birthday,
            isAlertOpen,
            alertMessage,
            severity,
            isDoctor,
        } = this.state;

        const isInvalid =
            moment.duration(moment().diff(birthday)).asYears() < 18 ||
            username === '' ||
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

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
                                <strong>Doctor</strong>
                            </label>{' '}
                            &nbsp;
                            <input
                                name="isDoctor"
                                type="checkbox"
                                checked={isDoctor}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label id="labId">
                                {' '}
                                <strong>First Name</strong>
                            </label>
                            <br />
                            <input
                                name="name"
                                value={name}
                                onChange={this.onChange}
                                type="text"
                                placeholder="First Name"
                            />
                        </div>
                        <div className="form-group">
                            <label id="labId">
                                {' '}
                                <strong>Surname</strong>
                            </label>
                            <br />
                            <input
                                name="surname"
                                value={surname}
                                onChange={this.onChange}
                                type="text"
                                placeholder="Surname"
                            />
                        </div>
                        <div className="form-group">
                            <label id="labId">
                                {' '}
                                <strong>Username</strong>
                            </label>
                            <br />
                            <input
                                name="username"
                                value={username}
                                onChange={this.onChange}
                                type="text"
                                placeholder="Username"
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
                                <strong>Birthdate</strong>
                            </label>
                            <br />
                            <TextField
                                name="birthday"
                                value={birthday}
                                format={'yyyy-MM-dd'}
                                onChange={this.onChange}
                                type="date"
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

export default SignUp;
export { SignUpForm, SignUpLink };
