import React, { Component } from "react";

import "../../index.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./Login";
import SignUp from "./Signup";
import Contact from "./Contact";
import Home from "./Home"

class Profile extends Component {

    state = {selectedFile: null}

    fileChangedHandler = event => {
        this.setState({selectedFile: event.target.files[0]})
    }

    uploadHandler = () => {
        console.log(
            this.state.selectedFile)
    }

    uploadHandler = () => {
        const formData = new FormData()
        formData.append(
            'myFile',
            this.state.selectedFile,
            this.state.selectedFile.name
        )
       // axios.post('my-domain.com/file-upload', formData)
    }
    render() {
        return (
            <div className="profilepage">

                <nav className="navbar  bg-primary navbar-expand-sm  navbar-dark fixed-top ">
                    <div className="container">

                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul className="navbar-nav mr-auto5 visible ">
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
                                    <Link className="nav-link" to={"/sign-in"}>Log Out</Link>
                                </li>
                            </ul>
                        </div>

                    </div>
                </nav>


                <h2>Profile</h2>

                <form>
                    <p>
                        <label>First Name</label> <br/>
                        <input className="w3-input" type="text"/></p>
                    <p>
                        <label>Last Name</label><br/>
                        <input className="w3-input" type="text"/></p>
                    <p>
                        <label>Email</label><br/>
                        <input className="w3-input" type="text"/></p>
                    <p>
                        <label>Birthday</label><br/>
                        <input type="date" name="party" min="1920-01-01" max="2002-01-01"/>
                    </p>
                    <p>
                        <input type="file" onChange={this.fileChangedHandler}/>
                        <button onClick={this.uploadHandler}>Upload!</button>
                    </p>
                </form>
            </div>
        );
    }
}

export default Profile;