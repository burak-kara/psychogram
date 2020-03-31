import React from "react";
import Time from "./postComponents/Time";
import Likes from "./postComponents/Likes";

const Post = (props) => (
    <div className="post-body">
        <div className="panel-body">
            {props.postBody}
            <div className="post-info">
                <Time/>
                <Likes/>
            </div>
        </div>
    </div>
);

export default Post;