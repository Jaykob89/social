import React from "react";
import {createField, Input, TextArea} from "../../common/FormsControl/FormsControl";
import s from './ProfileInfo.module.css'
import {InjectedFormProps, reduxForm} from "redux-form";
import styles from "../../common/FormsControl/FormsControl.module.css";
import {profileType} from "../Profile";


// type FormDataType = {
//     profile:any
//     fullName:string
//     lookingForAJob:string
//     lookingForAJobDescription:string
//
// }

const ProfileDataForm = ({handleSubmit, profile, error}:any) => {
    return <form onSubmit={handleSubmit}>
        <div>
            <button>save</button>
        </div>
        {error &&
            <div className={styles.formSummaryError}>
                {error}
            </div>
        }
        <div>
            <button>Login</button>
        </div>
        <div>Full name {createField('Full Name', 'fullName', [], Input, '')}</div>
        <div>Looking for a job :{createField('', 'lookingForAJob', [], Input, {type: 'checkbox'}, '')}
        </div>
        <div>My professional skills :
            {createField('My professional skills', 'lookingForAJobDescription', [], TextArea, '')}
        </div>
        <div>About me:
            {createField('About me', 'About me', [], TextArea, '')}
        </div>
        <div>
            Contacts : {Object.keys(profile.contacts).map(key => {
            return <div key={key} className={s.contact}>
                <b>{key}:{createField(key, 'contacts.' + key, [], Input, '')}</b>
            </div>
        })}
        </div>
    </form>
}

const ProfileDataFormReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm)
export default ProfileDataFormReduxForm