import React from 'react';
import s from './ProfileInfo.module.css'
import {Preloader} from "../../common/preloader/Preloader";
import {profileType} from "../Profile";
import ProfileStatus from './ProfileStatus'

type propsType = {
    profile: profileType | null
    status:string
    updateStatus:(status:string)=>void
}

const ProfileInfo = (props: propsType) => {

    if (!props.profile) {
        return <Preloader/>
    }

    return <div>
        {/*<div>*/}
        {/*    <img src='https://autoua.net/media/uploads/raznoe/d925cffa-tesla-model3-europe-sales-sept-6.jpg'/>*/}
        {/*</div>*/}
        <div className={s.descriptionBlock}>
            <img src={props.profile.photos.large}/>
            <div>{props.profile.fullName}</div>
            <div>{props.profile.aboutMe}</div>
            <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
        </div>
    </div>
}


export default ProfileInfo;