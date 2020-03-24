import React, {Component} from "react";
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import home from "./Home";
import profile from "./Profile";
import contact from "./Contact";

class Main extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <h1>PSYCHOGRAM</h1>
                    <ul className="header">
                        <li><NavLink exact to="/">Home</NavLink></li>
                        <li><NavLink to="/Profile">Profile</NavLink></li>
                        <li><NavLink to="/Contact">Contact</NavLink></li>
                    </ul>
                    <div className="content">
                        <Route exact path="/" component={home}/>
                        <Route path="/Profile" component={profile}/>
                        <Route path="/Contact" component={contact}/>
                    </div>
                </div>
            </HashRouter>
        );
    }
}

export default Main;