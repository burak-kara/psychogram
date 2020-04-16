import React, { Component } from 'react';
import Post from '../../components/forumComponents/Post';
import PostEditor from '../../components/forumComponents/PostEditor';
import Reply from '../../components/forumComponents/Reply';
import { Route } from 'react-router-dom';
import ForumNavigation from '../../components/forumComponents/ForumNavigation';

class Forum extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        };
        this.addPost = this.addPost.bind(this);
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
                <ForumNavigation />
                <Route exact path="/forum">
                    {this.state.posts.map((post, idx) => (
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
                    ))}
                </Route>
                <Route exact path="/forum/create">
                    <PostEditor addPost={this.addPost} />
                </Route>
            </div>
        );
    }
}

export default Forum;
