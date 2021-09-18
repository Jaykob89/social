import React from 'react';
import s from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {profilePageType, StoreType, tcarActionType} from "../../redux/store";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

type propsType  = {
    // profilePage:profilePageType
    // newText:string
    // dispatch:(action:tcarActionType)=>void
    // store:StoreType
}

const Profile = (props:propsType) => {

    return <div>
        <ProfileInfo/>
        <MyPostsContainer

                        // posts={props.profilePage.posts}
                          // newText= {props.newText}
                          // dispatch={props.dispatch}
        />
    </div>
}

export default Profile;