import React from 'react';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useParams } from 'react-router-dom';

import { RootState, AppDispatch } from '../../Store';
import { getUserDetails } from '../../Slices/UserSlice';
import { Navbar } from '../../Components/Navbar/Navbar';
import { Post } from '../../Components/Post/Post';
import { IReimbursement } from '../../Interfaces/IPost';
export const ProfilePage:React.FC = () => {

    const profile = useSelector((state:RootState) => state.user);

    const dispatch: AppDispatch = useDispatch();

    const { id } = useParams();

    useEffect(()=> {
        console.log("Get the information about user: ", id);
        if(id && !profile.currentProfile){
            dispatch(getUserDetails(id));
        }
        console.log("Current App State", profile);
    },[profile]);

    return (
        <div>
            <Navbar />
            <h1>Profile of {profile.currentProfile?.firstName} {profile.currentProfile?.lastName}</h1>
            {profile.currentProfile?.posts ? 
                <div>
                    {/* {profile.currentProfile.posts.map((post:IReimbursement)=>{
                        return (
                            <Post {...post} key={post.reimbursement_id} />
                        )
                    })} */}
                </div>
                :
                <h1>no posts to display</h1>
            }
        </div>
    )
}