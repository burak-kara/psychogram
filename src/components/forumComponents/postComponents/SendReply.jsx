import React, { Component } from 'react';

class SendReply extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
            replyStatus: true,
        };
    }

    sendMessage() {
        this.setState(prevState => ({
            disabled: !this.state.disabled,
            replyStatus: !prevState.replyStatus,
        }));
    }

    render() {
        return this.props.isLoggedIn ? (
            <div className="sendReply">
                <textarea
                    className="replyArea"
                    disabled={this.state.disabled ? 'disabled' : ''}
                />
                <button
                    className="sendMessage"
                    onClick={this.sendMessage.bind(this)}
                >
                    {' '}
                    {this.state.replyStatus ? 'Reply' : 'Cancel'}
                </button>
            </div>
        ) : null;
    }
}

export default SendReply;
