import React, { Component } from 'react';
import Post from '../../components/forumComponents/Post';
import PostEditor from '../../components/forumComponents/PostEditor';
import Reply from '../../components/forumComponents/Reply';
import { Route } from 'react-router-dom';
import ForumNavigation from '../../components/forumComponents/ForumNavigation';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../../_session';
import { Link, withRouter } from 'react-router-dom';

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
                <footer>
                    <p>
                        <h>Useful Links</h>
                    </p>
                    <p>
                        <Link
                            id="about-us"
                            className="common-link"
                            to={'/about-us'}
                        >
                            About Us
                        </Link>
                    </p>
                    <p>
                        <Link
                            id="contact"
                            className="common-link"
                            to={'/contact'}
                        >
                            Contact
                        </Link>
                    </p>
                    <p>
                        <Link id="faq" className="common-link" to={'/faq'}>
                            FAQ
                        </Link>
                    </p>
                    <p>
                        <Link id="home" className="common-link" to={''}>
                            Home
                        </Link>
                    </p>
                    <p>
                        <Link id="home" className="common-link" to={'/sign-in'}>
                            Sign in
                        </Link>
                    </p>
                </footer>
            </div>
        );
    }
}

const condition = authUser => authUser;

export default compose(
    withEmailVerification,
    withAuthorization(condition)
)(Forum);
