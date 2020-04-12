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

    addPost(newPostBody, newPostTitle) {
        const newState = Object.assign({}, this.state);
        let post = { body: newPostBody, title: newPostTitle };
        newState.posts.push(post);
        this.setState(newState);
    }

    render() {
        return (
            <div>
                {this.state.posts.map((post, idx) => {
                    return (
                        <div className="parent">
                            <Post
                                key={idx}
                                postBody={post.body}
                                postTitle={post.title}
                            />
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
