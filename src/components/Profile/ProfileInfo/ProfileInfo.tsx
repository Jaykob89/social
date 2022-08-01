import React, {ChangeEvent} from 'react';
import s from './ProfileInfo.module.css'
import {Preloader} from "../../common/preloader/Preloader";
import {profileType} from "../Profile";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from '../../../assets/images/user-profile.png'


type propsType = {
    profile: profileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
}

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto}: propsType) => {

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            savePhoto(e.target.files[0])
        }
    }

    return <div>

        <div className={s.descriptionBlock}>
            <img alt={'avatar_photo'} src={profile.photos.large || userPhoto}/>
            {isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
            <ProfileData profile={profile}/>
            <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
        </div>
    </div>
}


const ProfileData = ({profile}: any) => {
    return <div>
        <div>{profile.fullName}</div>
        <div>{profile.aboutMe}</div>
        <div>Looking for a job : {profile.lookingForAJob ? "yes" : 'no'}</div>
        {
            profile.lookingForAJobDescription &&
            <div>
                My professional skills : {profile.lookingForAJobDescription}
            </div>
        }
        <div>About me : {profile.aboutMe}</div>
        <div>Contacts :{Object.keys(profile.contacts).map(key => {
            return <Contact contactTitle={key} contactValue={profile.contacts[key]}/>
        })}</div>
    </div>
}

type ContactType = {
    [key: string]: string
}

const Contact = ({contactTitle, contactValue}: ContactType) => {
    return <div>{contactTitle}:{contactValue}</div>
}


export default ProfileInfo