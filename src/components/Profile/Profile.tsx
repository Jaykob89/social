import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {profilePageType} from "../../redux/store";

type photosType = {
    small: string
    large: string
}

export type profileType = null | {
    photos: photosType,
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: {}

}

const Profile = (props: any) => {

    return <div>
        <ProfileInfo profile={props.profile}/>
        <MyPostsContainer

            // posts={props.profilePage.posts}
            // newText= {props.newText}
            // dispatch={props.dispatch}
        />
    </div>
}

export default Profile;