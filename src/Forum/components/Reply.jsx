import React, {Component} from "react";
import CancelReply from "../components of Reply/CancelReply";
import EnterReply from "../components of Reply/EnterReply";
import SendReply from "../components of Reply/SendReply";

class Reply extends Component {
    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = {isLoggedIn: false};
    }

    handleLoginClick() {
        this.setState({isLoggedIn: true});
    }

    handleLogoutClick() {
        this.setState({isLoggedIn: false});
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        let button;
        if (isLoggedIn) {
            button = <CancelReply onClick={this.handleLogoutClick}/>;
        }
        else {
            button = <EnterReply onClick={this.handleLoginClick}/>;
        }

        return (
            <div>
                <SendReply isLoggedIn={isLoggedIn}/>
                {button}
            </div>
        );
    }
}

export default Reply;