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

const ProfileInfo = (props: propsType) => {

    if (!props.profile) {
        return <Preloader/>
    }

    return <div>

        <div className={s.descriptionBlock}>
            <img src={props.profile.photos.large}/>
            <div>{props.profile.fullName}</div>
            <div>{props.profile.aboutMe}</div>
            <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
        </div>
    </div>
}


export default ProfileInfo;