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
    savePhoto:(file:File)=>void
}

const ProfileInfo = ({profile, status, updateStatus, isOwner,savePhoto}: propsType) => {

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected =(e:ChangeEvent<HTMLInputElement>)=>{
         if (e.target.files) {
             savePhoto(e.target.files[0])
         }
    }

    return <div>

        <div className={s.descriptionBlock}>
            <img alt={'avatar_photo'} src={profile.photos.large || userPhoto}/>
            {isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
            <div>{profile.fullName}</div>
            <div>{profile.aboutMe}</div>
            <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
        </div>
    </div>
}


export default ProfileInfo;