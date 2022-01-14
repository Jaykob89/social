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

type profileInfoType = {
    profile: profileType | null
    status: string
    updateStatus: (status: string) => void
}

const Profile = (props: profileInfoType) => {

    return <div>
        <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
        <MyPostsContainer/>
    </div>
}

export default Profile;