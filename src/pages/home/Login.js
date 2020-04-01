import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router-dom'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
/*import '../App.css';*/
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";

import Main from "./Main";
import Home from './Home'
import SignUp from "./Signup";
import Contact from './Contact'
import Profile from './Profile'

export default class Login extends React.Component {

    state = {
        redirect: false
    }
    setRedirect = () => {
        this.setState({
            redirect: true
        })
        this.renderRedirect()
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/Home' />
        }
    }

    render() {
        return (
            <div>

            <form>
                <div className="mainTitle" style={{width: '100%',  height: '100%'}}>
                    <h1>PSYCHOGRAM</h1>
                </div>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <br></br>
                <div className="form-group">
                    <div className="login-with-google">
                        <a href="https://www.ozyegin.edu.tr">login-with-google</a>
                    </div>
                </div>

                <div className="form-group">
                    {this.renderRedirect()}
                    <button   onClick={this.setRedirect} type="submit" className="btn btn-primary btn-block">Submit</button>
                </div>

                <p id="noacc text-left">Don't have an acount? <Link id="noaccLink" className="nav-link" to={"/sign-up"}>Sign up</Link></p>

                <p className="forgot-password text-right"> Forgot <a href="#">password?</a> </p>


            </form>

         </div>

        );
    }
}
