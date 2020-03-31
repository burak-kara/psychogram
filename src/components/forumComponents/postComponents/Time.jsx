import React, {Component} from "react";

class Time extends Component {
    state = {
        currentTime: new Date().toLocaleString(),
    }

    render() {
        return (
            <div className="currentTime">
                <p className="time">{this.state.currentTime.substring(0,9)}</p>
            </div>
        );
    }
}

export default Time;
