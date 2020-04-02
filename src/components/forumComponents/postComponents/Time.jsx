import React, {Component} from "react";
import moment from "moment";

class Time extends Component {
    constructor(props) {
        super(props);
        this.state = {
            today: moment().format('DD.MM.YYYY')
        }
    }

    render() {
        return (
            <p className="currentTime">{this.state.today}</p>
        );
    }
}

export default Time;
