import React, { Component } from 'react';
import Post from '../../components/forumComponents/Post';
import PostEditor from '../../components/forumComponents/PostEditor';
import Reply from '../../components/forumComponents/Reply';

class Forum extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        };
    }

    addPost(newPostBody) {
        const newState = Object.assign({}, this.state);
        newState.posts.push(newPostBody);
        this.setState(newState);
    }

    render() {
        return (
            <div>
                {this.state.posts.map((postBody, idx) => {
                    return (
                        <div className="parent">
                            <Post key={idx} postBody={postBody} />
                            <div className="child">
                                <Reply />
                            </div>
                        </div>
                    );
                })}

                <PostEditor addPost={this.addPost.bind(this)} />
            </div>
        );
    }
}

export default Forum;
