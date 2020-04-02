import React, {Component} from "react";
import CancelReply from "./replyComponents/CancelReply";
import EnterReply from "./replyComponents/EnterReply";
import SendReply from "./replyComponents/SendReply";

class Reply extends Component {
    constructor(props) {
        super(props);
        this.state = {isLoggedIn: false};
    }

    cancelClick() {
        this.setState({isLoggedIn: true});
    }

    enterClick() {
        this.setState({isLoggedIn: false});
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        let button;
        if (isLoggedIn) {
            button = <CancelReply onClick={this.enterClick.bind(this)}/>;
        } else {
            button = <EnterReply onClick={this.cancelClick.bind(this)}/>;
        }

        return (
            <div className="rep">
                <SendReply isLoggedIn={isLoggedIn}/>
                {button}
            </div>
        );
    }
}

export default Reply;