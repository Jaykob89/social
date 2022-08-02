import React, {ChangeEvent, useState} from 'react';
import s from './ProfileInfo.module.css'
import {Preloader} from "../../common/preloader/Preloader";
import {profileType} from "../Profile";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from '../../../assets/images/user-profile.png'
import ProfileDataForm from "./ProfileDataForm";


type propsType = {
    profile: profileType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: profileType) => void
}


const ProfileInfo: React.FC<propsType> = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {

    let [editMode, setEditMode] = useState<boolean>(false)


    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: any) => {
        saveProfile(formData)
        setEditMode(false)
    }

    return <div>

        <div className={s.descriptionBlock}>
            <img alt={'avatar_photo'} src={profile.photos.large || userPhoto}/>
            {isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
            {editMode
                ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit}/>
                : <ProfileData goToEditMode={() => {
                    setEditMode(true)
                }} profile={profile} isOwner={isOwner}/>}

            <ProfileData profile={profile} isOwner={isOwner}/>
            <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
        </div>
    </div>

}


const ProfileData = ({profile, isOwner, goToEditMode}: propsType) => {

    return <div>
        {isOwner && <div>
            <button onClick={goToEditMode}>edit</button>
        </div>}
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

        {
            profile.contacts &&
            <div> Contacts : {Object.keys(profile.contacts).map(key => {
                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
            })}</div>
        }
    </div>
}

type ContactType = {
    [key: string]: string | null
}

export const Contact = ({contactTitle, contactValue}: any) => {
    return <div className={s.contact}>{contactTitle}:{contactValue}</div>
}


export default ProfileInfo