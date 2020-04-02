import React, {Component} from "react";

class Likes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    increment = () => {
        let newCounter = this.state.count + 1
        this.setState({
            count: newCounter
        })
    };

    render() {
        return (
            <button className="like" onClick={this.increment}>Likes: {this.state.count} </button>
        )
    }
}

export default Likes;