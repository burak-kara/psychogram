import React, {Component} from "react";
import Post from "./Post";
import PostEditor from "./PostEditor";
import Reply from "./Reply";

class ForumDisplay extends Component {
    constructor(props) {
        super(props);
        this.addPost = this.addPost.bind(this);
        this.state = {
            posts: []
        }
    }

    addPost(newPostBody) {
        const newState = Object.assign({}, this.state);
        newState.posts.push(newPostBody);
        this.setState(newState);
    }

    render() {
        return (
            <div>
                {
                    this.state.posts.map((postBody, idx) => {
                        return (
                            <div className="parent">
                                <Post key={idx} postBody={postBody}/>
                                <div className="child">
                                    <Reply/>
                                </div>
                            </div>
                        )
                    })
                }

                <PostEditor addPost={this.addPost}/>
            </div>

        )
    }
}

export default ForumDisplay;