import React from "react";
import {Link, Redirect} from "react-router-dom";

export default class Login extends React.Component {
    state = {
        redirect: false
    };

    setRedirect = () => {
        this.setState({
            redirect: true
        });
        this.renderRedirect()
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/Home'/>
        }
    };

    render() {
        return (
            <div>
                <div className="divLogin">
                    <form className="formLogin">
                        <div className="mainTitle">
                            <h1>PSYCHOGRAM</h1>
                        </div>
                        <h3>Sign In</h3>
                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" className="form-control" placeholder="Enter email"/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password"/>
                        </div>
                        <br></br>
                        <div className="form-group">
                            <div className="login-with-google">
                                <a href="https://www.ozyegin.edu.tr">Login with Google</a>
                            </div>
                        </div>
                        <div className="form-group">
                            {this.renderRedirect()}
                            <button onClick={this.setRedirect} type="submit" className="btn btn-primary btn-block">
                                Submit
                            </button>
                        </div>
                        <p id="noacc text-left">
                            Don't have an acount?
                            <Link id="noaccLink" className="nav-link" to={"/sign-up"}>Sign up</Link>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}
