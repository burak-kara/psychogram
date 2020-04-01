import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router-dom'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
/*import '../App.css';*/
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";

import Login from "./Login";

export default class SignUp extends React.Component {
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

            <div className="mainTitle">
                <h1>PSYCHOGRAM</h1>
            <form>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name" />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    {this.renderRedirect()}
                    <button   onClick={this.setRedirect} type="submit" className="btn btn-primary btn-block">Sign Up</button>
                </div>


                <p id="noacc text-left">Already registered? <Link id="noaccLink" className="nav-link" to={"/sign-in"}>Sign in</Link></p>

            </form>
            </div>
        );
    }
}