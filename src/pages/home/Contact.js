import React from "react";
import {Link} from "react-router-dom";

class Contact extends React.Component {
    render() {
        return (
            <div className="contactpage">
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
                <main>
                    <h2>GOT QUESTIONS?</h2>
                    <p>Ask your question to us via e-mail. <a href="mailto:info@psychogram.com">Email Me</a>
                    </p>
                </main>
            </div>
        );
    }
}

export default Contact