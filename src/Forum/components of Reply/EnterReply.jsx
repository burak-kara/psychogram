import React, {Component} from "react";

class EnterReply extends Component {

    render() {
        return (
            <button className="reply" onClick={this.props.onClick}>
                Reply
            </button>
        );
    }
}

export default EnterReply;