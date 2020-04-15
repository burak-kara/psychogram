import React, { useState } from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Alert from '../Alert';

const PostEditor = props => {
    const [alertOpen, setAlertsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('');
    const [postBody, setPostBody] = useState('');
    const [title, setTitle] = useState('');

    const handleAlertClose = () => {
        setAlertsOpen(false);
    };

    const handleTextChange = e => {
        setPostBody(e.target.value);
    };

    const handleTitleChange = e => {
        setTitle(e.target.value);
    };

    const createPost = () => {
        props.addPost(postBody, title);
        setPostBody('');
        setTitle('');
        setAlertsOpen(true);
        setSeverity('success');
        setMessage('Yeni post oluşturuldu.');
    };

    return (
        <div className="post-editor">
            <div className="panel-body">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter the title..."
                    value={title}
                    onChange={handleTitleChange}
                />
                <TextareaAutosize
                    className="form-control"
                    placeholder="Enter the content..."
                    rows="7"
                    cols="25"
                    value={postBody}
                    onChange={handleTextChange}
                />
                <button
                    className="btn-success"
                    onClick={createPost}
                    disabled={!postBody}
                >
                    Post
                </button>
                <Alert
                    open={alertOpen}
                    handleClose={handleAlertClose}
                    message={message}
                    severity={severity}
                />
            </div>
        </div>
    );
};

export default PostEditor;
