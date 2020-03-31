import React, {Component} from "react";
import CancelReply from "./replyComponents/CancelReply";
import EnterReply from "./replyComponents/EnterReply";
import SendReply from "./replyComponents/SendReply";

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