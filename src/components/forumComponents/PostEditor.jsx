import React, {Component} from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import ForumModal from "./ForumModal";

class PostEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPostBody: '',
            newTitle: '',
            modal: false
        };
        this.handleTextChange = this.handleTextChange.bind(this)
        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.createPost = this.createPost.bind(this)
    }

    handleTextChange(ev) {
        this.setState({
            newPostBody: ev.target.value
        });
    }

    handleTitleChange(ev) {
        this.setState({
            newTitle: ev.target.value
        });
    }

    createPost() {
        this.props.addPost(this.state.newPostBody, this.state.newTitle);
        this.setState({
            newPostBody: '',
            newTitle: '',
            modal: true
        });
    }

    modalClose() {
        this.setState({
            modal: false
        });
    }

    render() {
        return (
            <div className="post-editor">
                <div className="panel-body">
                    <input type="text" className="form-control"
                           placeholder="Enter the title..."
                           value={this.state.newTitle}
                           onChange={this.handleTitleChange}/>
                    <TextareaAutosize
                        className="form-control"
                        placeholder="Enter the content..."
                        rows="7"
                        cols="25"
                        value={this.state.newPostBody}
                        onChange={this.handleTextChange}
                    />
                    <button
                        className="btn-success"
                        onClick={this.createPost}
                        disabled={!this.state.newPostBody}
                    >
                        Post
                    </button>
                    <ForumModal show={this.state.modal} handleClose={e => this.modalClose(e)}>
                        <h3>Blog Successfully Created</h3>
                    </ForumModal>
                </div>
            </div>
        );
    }
}

export default PostEditor;
