import React from "react";
import Time from "../components of Post/Time";
import Likes from "../components of Post/Likes";

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