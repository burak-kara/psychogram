import React, { Component } from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

class PostEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPostBody: '',
        };
    }

    handleInputChange(ev) {
        this.setState({
            newPostBody: ev.target.value,
        });
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
                    <TextareaAutosize className="form-control" value={this.state.newPostBody}
                                      onChange={this.handleInputChange.bind(this)}/>
                    <button className="btn-success" onClick={this.createPost.bind(this)}
                            disabled={!this.state.newPostBody}>Post
                    </button>
                </div>
            </div>
        );
    }
}

export default PostEditor;