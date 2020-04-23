import { Link, withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import * as ROUTES from '../../../_constants/routeConstants';
import * as ROLES from '../../../_constants/roles';
import { withFirebase } from '../../../_firebase';
import { compose } from 'recompose';
import Alert from '../../Alert';
import TextField from '@material-ui/core/TextField';

const SignUp = () => (
    <div>
        <SignUpForm />
    </div>
);

const INITIAL_STATE = {
    username: '',
    name: '',
    surname: '',
    phone: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    isAdmin: false,
    birthday: '',
    description:'',
    isDoctor:false,
    profilePictureSource:'https://upload.wikimedia.org/wikipedia/commons/3/31/Michael_Jackson_in_1988.jpg',
    favArticles:{"0":{id:'', abstract:'',title:'',year:''}},
    favDocs:{"0":{id:'', name:'',notes:'',surname:''}},
    location:'',
    paymentMethods:{"0":{abstract:'',id:'',type:''}},
    meetings:{"0":{clinic:'',doctor:'',id:'',notes:''}},
    role:''
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

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    onSubmit = event => {
        const {
            username,
            name,
            surname,
            email,
            passwordOne,
            isAdmin,
            phone,
            birthday,
            description,
            profilePictureSource,
            favArticles,
            favDocs,
            location,
            paymentMethods,
            meetings
        } = this.state;

        let role = this.isDoctor ? ROLES.DOCTOR:ROLES.USER;

        if (isAdmin) {
            role = ROLES.ADMIN;
        }

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                return this.props.firebase.user(authUser.user.uid).set({
                    username,
                    name,
                    surname,
                    email,
                    phone,
                    role,
                    birthday,
                    description,
                    profilePictureSource,
                    favArticles,
                    favDocs,
                    location,
                    paymentMethods,
                    meetings
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
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleInputChange(event) {
        const target = event.target;
        const value = target.name === 'isDoctor' ? target.checked : target.value;
        const name = target.name;

        this.isDoctor =  target.checked ? true: false;

        this.setState({
            [name]: value
        });
    }

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
            profilePictureSource,
            favArticles,
            favDocs,
            location,
            paymentMethods,
            meetings
        } = this.state;

        function calculate_age(birthdate) {
            var today = new Date();
            var birthDate = new Date(birthdate);
            var age_now = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
            {
                age_now--;
            }
            return age_now;
        }

        const isInvalid =
            calculate_age(birthday) < 18 ||
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
                            </label> &nbsp;
                            <input
                                name="isDoctor"
                                type="checkbox"
                                checked={this.isDoctor}
                                onChange={this.handleInputChange}
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
