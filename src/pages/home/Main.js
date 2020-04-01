import React from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./Login";
import SignUp from "./Signup";
import Home from './Home'
import Contact from './Contact'
import Profile from './Profile'

function Main() {
    return (<Router>
            <div className="App">
                <nav className="navbar navbar-expand-sm navbar-light fixed-top ">
                    <div className="container">

                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul className="navbar-nav mr-auto5 invisible ">
                                <li className="nav-item">
                                    <Link className="navbar-brand" to={"/Home"}>HOME</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="navbar-brand" to={"/Profile"}>PROFILE</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="navbar-brand" to={"/Contact"}>CONTACT</Link>
                                </li>
                            </ul>
                        </div>

                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/sign-in"}>Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                                </li>
                            </ul>
                        </div>

                    </div>
                </nav>

                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <Switch>
                            <Route exact path='/' component={Login} />
                            <Route path="/sign-in" component={Login} />
                            <Route path="/sign-up" component={SignUp} />
                            <Route path="/Home" component={Home} />
                            <Route path="/Profile" component={Profile} />
                            <Route path="/Contact" component={Contact} />
                        </Switch>
                    </div>
                </div>
            </div></Router>
    );
}

export default Main;
