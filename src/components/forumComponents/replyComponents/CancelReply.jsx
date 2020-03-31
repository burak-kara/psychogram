import React, {Component} from "react";

class CancelReply extends Component {
    render() {
        return (
            <button className="reply" onClick={this.props.onClick}>
                Cancel
            </button>
        );
    }
}

export default CancelReply;