import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Profile from "../pages/profile/Profile";
import Home from "../pages/home/Home";

export default class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route
                        exact path="/"
                        render={(props) => <Home/>}
                    />
                    <Route
                        exact path="/profile"
                        render={(props) => <Profile/>}
                    />
                </Switch>
            </Router>
        );
    }
}
