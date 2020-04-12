import React from 'react';
import Time from './postComponents/Time';
import Likes from './postComponents/Likes';

const Post = props => (
    <div className="post-container">
        <div className="post-title">{props.postTitle}</div>
        <div className="post-body">{props.postBody}</div>
        <div className="post-info">
            <Time />
            <Likes />
        </div>
    </div>
);

export default Post;
