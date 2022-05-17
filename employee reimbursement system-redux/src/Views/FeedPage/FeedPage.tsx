import React, { ReactNode, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Navbar } from '../../Components/Navbar/Navbar';
import { RootState, AppDispatch } from '../../Store';
import { useNavigate } from 'react-router-dom';

import { getReimbursements } from '../../Slices/PostSlice';

import { CreateReimbursement } from '../../Components/CreateReimbursementRequest/CreateReimbursementRequest';
import { Loading } from '../../Components/Loading/Loading';
import { Post } from '../../Components/Post/Post';
import { IReimbursement } from '../../Interfaces/IPost';

import './FeedPage.css';

export const FeedPage: React.FC = () => {

    const userInfo = useSelector((state:RootState) => state.user);
    const posts = useSelector((state:RootState) => state.posts);
    const navigator = useNavigate();
    const dispatch:AppDispatch = useDispatch();

    useEffect(() => {
        //If the user is not logged in, push them to the login page
        if(!userInfo.user){
            navigator("/login");
        }
        //If the user IS logged in, but we have not gotten their posts yet
        else if(userInfo.user && !posts.posts){
            dispatch(getReimbursements());
        }

        console.log("Userstate: ", userInfo, "Posts: ", posts);
    }, [userInfo, posts.posts]);

    return(
        <div>
            <Navbar />
            <div className="feed-page">
                { <CreateReimbursement/> }
                {posts.posts ? posts.posts.map((post) => {
                    return <Post {...post} key={post.reimbursement_id} />
                }) :
                <Loading />
                }
            </div>
        </div>
    )

}