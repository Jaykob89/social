import React from 'react';
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

export type photosType = {
    small: string
    large: string
}
export type profileType = {
    photos: photosType,
    aboutMe?: string
    lookingForAJob?: boolean
    lookingForAJobDescription?: string
    fullName?: string
    contacts?: {
        [key: string]: string | null
        //.....
    }
}

type profileInfoType = {
    profile: profileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
}

const Profile = (props: profileInfoType) => {

    return <div>
        <ProfileInfo savePhoto={props.savePhoto} isOwner={props.isOwner} profile={props.profile} status={props.status}
                     updateStatus={props.updateStatus}/>
        <MyPostsContainer/>
    </div>
}

export default Profile;