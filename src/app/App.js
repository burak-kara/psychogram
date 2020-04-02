import React, {Component} from 'react';
import './App.css';
// import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import Profile from "../pages/profile/Profile";
import Home from "../pages/home/Home";
import Contact from "../pages/home/Contact";
import * as ROUTES from "../constants/routes";

export default class App extends Component {
    render() {
        return (
            <HashRouter>
                <div className="navigator">
                    <ul className="header">
                        <li><NavLink exact to={ROUTES.LANDING}>Home</NavLink></li>
                        <li><NavLink to={ROUTES.PROFILE}>Profile</NavLink></li>
                        <li><NavLink to={ROUTES.CONTACT}>Contact</NavLink></li>
                        {/*<li><NavLink to={ROUTES.FORUM}>Forum</NavLink></li>*/}
                    </ul>
                    <div className="content">
                        <Route exact path={ROUTES.LANDING} component={Home}/>
                        <Route path={ROUTES.PROFILE} component={Profile}/>
                        <Route path={ROUTES.CONTACT} component={Contact}/>
                        {/*<Route path={ROUTES.FORUM} component={Forum}/>*/}
                    </div>
                </div>
            </HashRouter>
        );
    }
}
