import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

type photosType = {
    small: string
    large: string
}

export type profileType = {
    photos: photosType,
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: {
        [key: string]: string | null
        //.....
    }
}

const Profile = (props: any) => {

    return <div>
        <ProfileInfo profile={props.profile}/>
        <MyPostsContainer

        />
    </div>
}

export default Profile;