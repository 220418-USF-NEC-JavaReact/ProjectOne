import React from 'react';

import './Post.css';
import defaultImage from "../../deafultpic.jpg";

export const Post = (post: any) => {

    return(
        <div className="post">
            <div className="post-profile">
                <img className="post-image" src={defaultImage} />
                <h3 className="post-user">{post.author} </h3>
            </div>

            <div className="post-content">
                <p>{post.description}</p>
                <p>{post.amount}</p>
            </div>
        </div>
    )

}