import React, {Component} from "react";

class PostEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPostBody: '',
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.createPost = this.createPost.bind(this);

    }

    handleInputChange(ev) {
        this.setState({
            newPostBody: ev.target.value
        })
    }

    createPost() {
        this.props.addPost(this.state.newPostBody);
        this.setState({
            newPostBody: '',
        });
    }

    render() {
        return (
            <div className="post-editor">
                <div className="panel-body">
                    <textarea className="form-control" value={this.state.newPostBody}
                              onChange={this.handleInputChange}/>
                    <button className="btn-success" onClick={this.createPost}>Post</button>
                </div>
            </div>
        )
    }
}

export default PostEditor;