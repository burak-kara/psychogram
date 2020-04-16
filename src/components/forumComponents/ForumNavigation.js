import { Link } from 'react-router-dom';
import React from 'react';

const ForumNavigation = () => {
    return (
        <nav>
            <div className="nav-btn">
                <Link to={'/forum'}>
                    <button className="list-btn">List Posts</button>
                </Link>
            </div>
            <div className="nav-btn">
                <Link to={'/forum/create'}>
                    <button className="post-btn">Add New Post</button>
                </Link>
            </div>
        </nav>
    );
};

export default ForumNavigation;
