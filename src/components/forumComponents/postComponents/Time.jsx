import React, {Component} from "react";

class Time extends Component {
    constructor(props) {
        super(props);
        this.state = {
            today: Date.now()
        }
    }


    render() {
        return (
            <p className="currentTime">{((new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }).format(this.state.today)))}</p>
        );
    }
}

export default Time;
