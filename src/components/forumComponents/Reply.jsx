import React, { Component } from 'react';
import SendReply from './postComponents/SendReply';

class Reply extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoggedIn: false };
    }

    cancelClick() {
        this.setState({ isLoggedIn: true });
    }

    enterClick() {
        this.setState({ isLoggedIn: false });
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        let button;
        if (isLoggedIn) {
            button = (
                <button className="reply" onClick={this.enterClick.bind(this)}>
                    Cancel
                </button>
            );
        } else {
            button = (
                <button className="reply" onClick={this.cancelClick.bind(this)}>
                    Reply
                </button>
            );
        }

        return (
            <div className="rep">
                <SendReply isLoggedIn={isLoggedIn} />
                {button}
            </div>
        );
    }
}

export default Reply;
