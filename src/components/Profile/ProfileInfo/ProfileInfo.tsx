import React from 'react';
import s from './ProfileInfo.module.css'
import {Preloader} from "../../common/preloader/Preloader";
import {profileType} from "../Profile";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

type propsType = {
    profile: profileType | null
    status: string
    updateStatus: (status: string) => void
}

const ProfileInfo = ({profile, status, updateStatus}: propsType) => {

    if (!profile) {
        return <Preloader/>
    }

    return <div>

        <div className={s.descriptionBlock}>
            <img src={profile.photos.large}/>
            <div>{profile.fullName}</div>
            <div>{profile.aboutMe}</div>
            <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
        </div>
    </div>
}


export default ProfileInfo;