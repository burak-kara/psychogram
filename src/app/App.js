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
import Forum from "../pages/forum/Forum";
export default class App extends Component {
    render() {
        return (
            <HashRouter>
                <div >
                    <div className="title">
                    </div>
                    <ul className="header">
                        <li><NavLink exact to="/">Home</NavLink></li>
                        <li><NavLink to="/Profile">Profile</NavLink></li>
                        <li><NavLink to="/Contact">Contact</NavLink></li>
                        <li><NavLink to="/Forum">Forum</NavLink></li>
                    </ul>
                    <div className="content">
                        <Route exact path="/" component={Home}/>
                        <Route path="/Profile" component={Profile}/>
                        <Route path="/Contact" component={Contact}/>
                        <Route path="/Forum" component={Forum}/>
                    </div>
                </div>
            </HashRouter>
        );
    }
}
