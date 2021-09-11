import React from 'react';
import s from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {profilePageType, tcarActionType} from "../../redux/state";



type propsType  = {
    profilePage:profilePageType
    newText:string
    dispatch:(action:tcarActionType)=>void
}

const Profile = (props:propsType) => {

    return <div>
        <ProfileInfo/>
        <MyPosts posts={props.profilePage.posts} newText= {props.newText} dispatch={props.dispatch} />
    </div>
}


export default Profile;