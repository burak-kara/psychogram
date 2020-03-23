import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Profile from "../pages/profile/Profile";

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route
                        exact path="/"
                        render={(props) => <Profile/>}
                    />
                </Switch>
            </BrowserRouter>
        );
    }
}
