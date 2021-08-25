import React from 'react';
import s from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {profilePageType} from "../../redux/state";



type propsType  = {
    profilePage:profilePageType
    addPost:()=>void
    newText:string
    changeNewText:(newText:string)=>void
}

const Profile = (props:propsType) => {

    return <div>
        <ProfileInfo/>
        <MyPosts posts={props.profilePage.posts} newText= {props.newText} addPost={props.addPost} changeNewText={props.changeNewText} />
    </div>
}


export default Profile;