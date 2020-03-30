import React, {Component} from "react";
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import home from "./Home";
import profile from "./Profile";
import contact from "./Contact";
import forum from "./Forum"

class Main extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <div className="header">
                        <div className="title">
                            <h3>PSYCHOGRAM</h3>
                        </div>
                        <div className="path">
                            <li><NavLink exact to="/">Home</NavLink></li>
                            <li><NavLink to="/Profile">Profile</NavLink></li>
                            <li><NavLink to="/Contact">Contact</NavLink></li>
                            <li><NavLink to="/Forum">Forum</NavLink></li>
                        </div>
                    </div>
                    <div className="content">
                        <Route exact path="/" component={home}/>
                        <Route path="/Profile" component={profile}/>
                        <Route path="/Contact" component={contact}/>
                        <Route path="/Forum" component={forum}/>
                    </div>
                </div>
            </HashRouter>
        );
    }
}

export default Main;