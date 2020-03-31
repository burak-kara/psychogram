import React, {Component} from "react";

class SendReply extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
            showSubmission: true
        };
        this.sendMessage = this.sendMessage.bind(this);
    }

    sendMessage() {
        this.setState(prevState => ({
            disabled: !this.state.disabled,
            replyStatus: !prevState.showSubmission
        }));
    }

    render() {
        const isLoggedIn = this.props.isLoggedIn;
        if (isLoggedIn) {
            return (
                <div>
                    <textarea className="replyArea" disabled={(this.state.disabled) ? "disabled" : ""}/>
                    <button className="sendMessage"
                            onClick={this.sendMessage.bind(this)}> {this.state.showSubmission ? "Reply" : "Cancel"}
                    </button>
                </div>
            )
        }
        return "";
    }
}

export default SendReply;